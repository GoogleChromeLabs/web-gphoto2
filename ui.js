import { h, render, Component, createRef, Fragment } from 'preact';
import initModule from './libapi.mjs';

/** @typedef {InstanceType<import('./libapi.mjs').Module['Context']>} Context */
/** @typedef {import('./libapi.mjs').Config} Config */

let isDebug = new URLSearchParams(location.search).has('debug');

if (isDebug) {
  // @ts-ignore
  await import('preact/debug');
}

/** This function should be called once user has selected the camera and other operations can begin. */
let prepareContext;

/** Schedules an exclusive async operation on the global context. */
const scheduleOp = (() => {
  let queue = (async () => {
    await new Promise(resolve => {
      prepareContext = resolve;
    });
    let { Context } = await initModule();
    let ctx = await new Context();
    addEventListener('beforeunload', e => {
      ctx.delete();
    });
    return ctx;
  })();

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
class Widget extends Component {
  state = { inProgress: false };

  shouldComponentUpdate(
    /** @type {Widget['props']} */ nextProps,
    /** @type {Widget['state']} */ nextState
  ) {
    return !(this.state.inProgress && nextState.inProgress);
  }

  getValueProp(out = false) {
    switch (this.props.config.type) {
      case 'toggle':
        return 'checked';
      case 'datetime':
        return 'valueAsNumber';
      case 'range':
        // Apparently can't render with `valueAsNumber` as preact property,
        // but can retrieve it back.
        return out ? 'valueAsNumber' : 'value';
      default:
        return 'value';
    }
  }

  handleChange = async e => {
    this.setState({ inProgress: true });

    let value = e.target[this.getValueProp(true)];

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
    /** @type {Widget['props']} */ { config },
    /** @type {Widget['state']} */ { inProgress }
  ) {
    let { label, name } = config;
    let id = `config-${name}`;
    if (config.type === 'window' || config.type === 'section') {
      return h(
        'fieldset',
        { id },
        h('legend', {}, label),
        Object.values(config.children).map(config =>
          h(Widget, { key: config.name, config })
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
        id: 'capture',
        class:
          'pure-button' + (this.state.inProgress ? ' pure-button-active' : ''),
        onclick: this.handleCapture,
        value: `${this.state.inProgress ? '⌛' : '📷'} Capture image`
      })
    );
  }
}

/** @typedef {{ type: 'CameraPicker' } | { type: 'Status', message: string } | { type: 'Config', config: Config }} AppState */

const INTERFACE_CLASS = 6; // PTP
const INTERFACE_SUBCLASS = 1; // MTP

/** @extends Component<null, AppState> */
class App extends Component {
  state = /** @type {AppState} */ ({
    type: 'Status',
    message: 'Looking for cameras...'
  });

  constructor(...args) {
    super(...args);
    // @ts-ignore
    navigator.usb.getDevices().then(devices => {
      for (let dev of devices) {
        for (let conf of dev.configurations) {
          for (let intf of conf.interfaces) {
            for (let alt of intf.alternates) {
              if (
                alt.interfaceClass === INTERFACE_CLASS &&
                alt.interfaceSubclass === INTERFACE_SUBCLASS
              ) {
                return this.connectToCamera();
              }
            }
          }
        }
      }
      this.setState({ type: 'CameraPicker' });
    });
    window.onerror = message => {
      this.setState({
        type: 'Status',
        message: `⚠ ${message}`
      });
    };
  }

  selectDevice = async () => {
    // @ts-ignore
    await navigator.usb.requestDevice({
      filters: [
        {
          classCode: INTERFACE_CLASS,
          subclassCode: INTERFACE_SUBCLASS
        }
      ]
    });
    this.connectToCamera();
  };

  connectToCamera() {
    prepareContext();
    this.setState({ type: 'Status', message: 'Connecting...' });
    (async () => {
      while (true) {
        await this.refreshConfig();
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    })();
  }

  async refreshConfig() {
    let config = await scheduleOp(context => context.configToJS());
    if (!isDebug) {
      delete config.children.other;
    }
    this.setState({
      type: 'Config',
      config
    });
  }

  render(/** @type {App['props']} */ props, /** @type {App['state']} */ state) {
    switch (state.type) {
      case 'CameraPicker':
        return h(
          'div',
          { class: 'center-parent' },
          h('input', {
            class: 'center',
            type: 'button',
            onclick: this.selectDevice,
            value: '🔍 Select camera'
          })
        );
      case 'Status':
        return h(
          'div',
          { class: 'center-parent' },
          h('div', { class: 'center' }, state.message)
        );
      case 'Config':
        return h(
          'div',
          { class: 'pure-g' },
          h(
            'div',
            { class: 'pure-u-2-3 center-parent', id: 'canvas-holder' },
            h(PreviewCanvas, {
              id: 'preview-canvas',
              class: 'center'
            })
          ),
          h(
            'div',
            { id: 'config', class: 'pure-u-1-3' },
            h(
              'form',
              { class: 'pure-form pure-form-aligned' },
              h(CaptureButton, null),
              h(Widget, { config: state.config })
            )
          )
        );
    }
  }
}

render(h(App, null), document.body);

class PreviewCanvas extends Component {
  ref = createRef();

  render(props) {
    return h('canvas', { ...props, ref: this.ref });
  }

  async componentDidMount() {
    let canvas = /** @type {HTMLCanvasElement} */ (this.ref.current);
    let canvasHolder = canvas.parentElement;

    let canvasCtx = canvas.getContext('bitmaprenderer');

    let ratio = 0;

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
    new ResizeObserver(updateCanvasSize).observe(canvasHolder);

    // I have no idea why, but if we connect too soon, it just hangs...
    await new Promise(resolve => setTimeout(resolve, 1000));

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
          updateCanvasSize();
        }
        canvasCtx.transferFromImageBitmap(img);
      } catch (e) {
        console.warn(e);
      }
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
  }
}
