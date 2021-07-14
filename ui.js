import { h, render, Component, createRef, Fragment } from 'preact';
import initModule from './libapi.mjs';

/** @typedef {InstanceType<import('./libapi.mjs').Module['Context']>} Context */
/** @typedef {import('./libapi.mjs').Config} Config */

if (new URLSearchParams(location.search).has('debug')) {
  // @ts-ignore
  await import('preact/debug');
}

/** Schedules an exclusive async operation on the global context. */
const scheduleOp = (() => {
  let queue = initModule()
    .then(Module => new Module.Context())
    .then(ctx => {
      addEventListener('beforeunload', e => {
        ctx.delete();
      });
      return ctx;
    });

  /**
   * @template T
   * @param {(ctx: Context) => Promise<T>} op
   * @returns {Promise<T>}
   */
  return function scheduleOp(op) {
    let caughtRes = queue.then(async ctx => {
      let resultPromise = op(ctx);
      try {
        await resultPromise;
      } catch {}
      return {
        ctx,
        resultPromise
      };
    });

    // Queue should ignore result values as well as errors from singular ops.
    queue = caughtRes.then(res => res.ctx);

    // Result should contain the unwrapped value or error.
    return caughtRes.then(res => res.resultPromise);
  };
})();

/**
 *
 * @extends Component<{ config: Config }>
 */
class ConfigComponent extends Component {
  state = { inProgress: false };

  shouldComponentUpdate(
    /** @type {ConfigComponent['props']} */ nextProps,
    /** @type {ConfigComponent['state']} */ nextState
  ) {
    return !(this.state.inProgress && nextState.inProgress);
  }

  getValueProp() {
    switch (this.props.config.type) {
      case 'toggle':
        return 'checked';
      case 'datetime':
        return 'valueAsNumber';
      default:
        return 'value';
    }
  }

  handleChange = async e => {
    this.setState({ inProgress: true });

    let value = e.target[this.getValueProp()];

    try {
      /** @type {Promise<void>} */
      let uiTimeout;
      await scheduleOp(context => {
        // This is terrible, yes... but some configs return too quickly before they're actually updated.
        // We want to wait some time before updating the UI in that case, but not block subsequent ops.
        uiTimeout = new Promise(resolve => setTimeout(resolve, 800));
        return context.setConfigValue(this.props.config.name, value);
      });
      await uiTimeout;
    } catch (e) {
      console.error(e);
    }

    this.setState({ inProgress: false });
  };

  render(
    /** @type {ConfigComponent['props']} */ { config },
    /** @type {ConfigComponent['state']} */ { inProgress }
  ) {
    let { label, name } = config;
    let id = `config-${name}`;
    if (config.type === 'window' || config.type === 'section') {
      return h(
        'fieldset',
        { id },
        h('legend', {}, label),
        Object.values(config.children).map(config =>
          h(ConfigComponent, { key: config.name, config })
        )
      );
    }
    let { value, readonly } = config;
    let valueProp = this.getValueProp();
    let attrs = {
      id,
      [valueProp]: value,
      readonly: readonly || inProgress,
      onChange: this.handleChange
    };
    let inputElem;
    switch (config.type) {
      case 'range': {
        let { min, max, step } = config;
        inputElem = h(EditableInput, {
          type: 'number',
          min,
          max,
          step,
          ...attrs
        });
        break;
      }
      case 'text':
        inputElem = readonly ? value : h(EditableInput, attrs);
        break;
      case 'toggle': {
        inputElem = h('input', {
          type: 'checkbox',
          ...attrs
        });
        break;
      }
      case 'menu':
      case 'radio': {
        let { choices } = config;
        inputElem = h(
          'select',
          attrs,
          choices.map(choice =>
            h(Option, {
              key: choice,
              value: choice,
              disabled: attrs.readonly && value !== choice
            })
          )
        );
        break;
      }
      case 'datetime': {
        inputElem = h(EditableInput, {
          type: 'datetime-local',
          ...attrs
        });
        break;
      }
      default: {
        inputElem = '(unimplemented)';
        break;
      }
    }
    return h(
      'div',
      { class: 'pure-control-group' },
      h('label', { for: id }, (inProgress ? '⌛ ' : '') + label),
      inputElem
    );
  }
}

/**
 * Special memoized option to work around https://github.com/preactjs/preact/issues/3171.
 * @extends Component<{ value: string, disabled?: boolean }>
 */
class Option extends Component {
  shouldComponentUpdate(/** @type {Option['props']} */ nextProps) {
    return nextProps.value !== this.props.value;
  }

  render() {
    return h('option', this.props, this.props.value);
  }
}

/**
 * Wrapper around <input /> that doesn't update it while it's in focus to allow editing.
 */
class EditableInput extends Component {
  ref = createRef();

  shouldComponentUpdate() {
    return document.activeElement !== this.ref.current;
  }

  render(props) {
    return h('input', Object.assign(props, { ref: this.ref }));
  }
}

/** @extends Component<null, { inProgress: boolean }> */
class CaptureButton extends Component {
  state = { inProgress: false };

  handleCapture = async () => {
    this.setState({ inProgress: true });
    let file = await scheduleOp(context => context.captureImageAsFile());
    let url = URL.createObjectURL(file);
    Object.assign(document.createElement('a'), {
      download: file.name,
      href: url
    }).click();
    URL.revokeObjectURL(url);
    this.setState({ inProgress: false });
  };

  render() {
    return h(
      Fragment,
      null,
      h('input', {
        type: 'button',
        class:
          'pure-button' + (this.state.inProgress ? ' pure-button-active' : ''),
        onclick: this.handleCapture,
        value: 'Capture image'
      }),
      this.state.inProgress ? ' ⌛' : ''
    );
  }
}

/** @extends Component<null, { config: string | Config }> */
class Settings extends Component {
  state = { config: 'Connecting...' };

  constructor() {
    super();
    (async () => {
      while (true) {
        await this.refreshConfig();
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    })();
  }

  async refreshConfig() {
    let config;
    try {
      config = await scheduleOp(context => context.configToJS());
    } catch (e) {
      config = String(e);
    }
    this.setState({
      config
    });
  }

  render(
    /** @type {Settings['props']} */ props,
    /** @type {Settings['state']} */ state
  ) {
    return typeof state.config === 'string'
      ? state.config
      : h(
          'form',
          { class: 'pure-form pure-form-aligned' },
          h(CaptureButton, null),
          h(ConfigComponent, { config: state.config })
        );
  }
}

render(h(Settings, null), document.getElementById('config'));

(async () => {
  // I have no idea why, but if we connect too soon, it just hangs...
  await new Promise(resolve => setTimeout(resolve, 500));

  let canvas = /** @type {HTMLCanvasElement} */ (
    document.getElementById('canvas')
  );

  let canvasCtx = canvas.getContext('bitmaprenderer');

  let ratio = 0;

  while (true) {
    try {
      let blob = await scheduleOp(context => context.capturePreviewAsBlob());

      // If ratio is known; decode resized image right away - it's a bit faster.
      // If it isn't known, retrieve entire image to calculate ratio from its dimensions.
      let img = await createImageBitmap(
        blob,
        ratio
          ? {
              resizeWidth: canvas.width,
              resizeHeight: canvas.height
            }
          : {}
      );
      if (!ratio) {
        ratio = img.width / img.height;
        let canvasHolder = document.getElementById('canvas-holder');

        function updateCanvasSize() {
          let width = canvasHolder.offsetWidth - 10;
          let height = canvasHolder.offsetHeight;

          if (height * ratio > width) {
            height = width / ratio;
          } else {
            width = height * ratio;
          }

          Object.assign(canvas, { width, height });
        }

        updateCanvasSize();
        new ResizeObserver(updateCanvasSize).observe(canvasHolder);
      }
      canvasCtx.transferFromImageBitmap(img);
    } catch (e) {
      console.warn(e);
    }
    await new Promise(resolve => requestAnimationFrame(resolve));
  }
})();
