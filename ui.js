import { h, render, Component } from 'preact';
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
 * @param {{
 *  config: Config,
 *  inProgress: boolean,
 * }} params
 * @returns {import('preact').VNode<any>}
 */
function Config({ config, inProgress }) {
  let { label, name } = config;
  let id = `config-${name}`;
  if (config.type === 'window' || config.type === 'section') {
    return h(
      'fieldset',
      { id },
      h('legend', {}, label),
      Object.values(config.children).map(config =>
        h(Config, { key: config.name, config, inProgress })
      )
    );
  }
  let { value, readonly } = config;
  let valueProp;
  switch (config.type) {
    case 'toggle':
      valueProp = 'checked';
      break;
    case 'range':
    case 'datetime':
      valueProp = 'valueAsNumber';
      break;
    default:
      valueProp = 'value';
  }
  // We don't want to override current input's value while user is editing it.
  if (document.activeElement?.id === id) {
    // @ts-ignore
    value = document.activeElement?.[valueProp];
  }
  let attrs = {
    id,
    [valueProp]: value,
    readonly,
    disabled: inProgress
  };
  let inputElem;
  switch (config.type) {
    case 'range': {
      let { min, max, step } = config;
      inputElem = h('input', { type: 'number', min, max, step, ...attrs });
      break;
    }
    case 'text':
      inputElem = readonly ? value : h('input', attrs);
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
          h(
            'option',
            {
              key: choice,
              value: choice,
              disabled: attrs.readonly && value !== choice
            },
            choice
          )
        )
      );
      break;
    }
    case 'datetime': {
      inputElem = h('input', {
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
    h('label', { for: id }, label),
    inputElem
  );
}

class Settings extends Component {
  state = { inProgress: false, config: 'Connecting...' };

  constructor() {
    super();
    (async () => {
      while (true) {
        await this.refreshConfig();
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    })();
  }

  handleChange = async e => {
    let name = e.target.id;
    if (!name.startsWith('config-')) {
      throw new Error('Unhandled input');
    }
    name = name.slice('config-'.length);
    let value;
    switch (e.target.type) {
      case 'checkbox':
        value = e.target.checked;
        break;
      case 'number':
      case 'datetime-local':
        value = e.target.valueAsNumber;
        break;
      default:
        value = e.target.value;
        break;
    }

    this.setState({ inProgress: true });

    try {
      await scheduleOp(context => context.setConfigValue(name, value));
    } catch (e) {
      console.error(e);
    }

    await this.refreshConfig();
    this.setState({ inProgress: false });
  };

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

  handleCapture = async () => {
    let file = await scheduleOp(context => context.captureImageAsFile());
    let a = document.createElement('a');
    a.download = file.name;
    a.href = URL.createObjectURL(file);
    a.click();
    URL.revokeObjectURL(a.href);
  };

  render(props, state) {
    return typeof state.config === 'string'
      ? state.config
      : h(
          'form',
          {
            class: 'pure-form pure-form-aligned',
            onchange: this.handleChange
          },
          h('input', {
            type: 'button',
            value: 'Capture image',
            onclick: this.handleCapture
          }),
          h(Config, state)
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
