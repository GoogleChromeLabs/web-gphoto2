import { h, render, Component, createRef, Fragment } from 'preact';
import { scheduleOp, start } from './ops.js';
import { Widget } from './widget.js';

/** @typedef {import('../libapi.mjs').Context} Context */
/** @typedef {import('../libapi.mjs').Config} Config */

let isDebug = new URLSearchParams(location.search).has('debug');

if (isDebug) {
  // @ts-ignore
  await import('preact/debug');
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
    addEventListener('error', ({ message }) => {
      this.setState({
        type: 'Status',
        message: `⚠ ${message}`
      });
    });
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
    start();
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
          h('div', { class: 'pure-u-2-3' }, h(PreviewCanvas, null)),
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
  canvasHolderRef = createRef();
  canvasRef = createRef();

  render(props) {
    return h(
      'div',
      { class: 'center-parent', ref: this.canvasHolderRef },
      h('canvas', { class: 'center', ref: this.canvasRef })
    );
  }

  async componentDidMount() {
    let canvas = /** @type {HTMLCanvasElement} */ (this.canvasRef.current);
    let canvasHolder = this.canvasHolderRef.current;

    let canvasCtx = canvas.getContext('bitmaprenderer');

    let ratio = 0;

    let throttled = 0;
    function updateCanvasSize() {
      if (throttled) {
        cancelAnimationFrame(throttled);
      }
      throttled = requestAnimationFrame(() => {
        throttled = 0;

        let width = canvasHolder.offsetWidth - 10;
        let height = canvasHolder.offsetHeight;

        if (height * ratio > width) {
          height = width / ratio;
        } else {
          width = height * ratio;
        }

        Object.assign(canvas, { width, height });
      });
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
