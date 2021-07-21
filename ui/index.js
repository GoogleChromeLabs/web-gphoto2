import { h, render, Component, Fragment } from 'preact';
import { scheduleOp, start } from './ops.js';
import { Preview } from './preview.js';
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

  /**
   * Set the specified config value.
   * @param {string} name
   * @param {*} value
   */
  setValue = async (name, value) => {
    /** @type {Promise<void>} */
    let uiTimeout;
    await scheduleOp(context => {
      // This is terrible, yes... but some configs return too quickly before they're actually updated.
      // We want to wait some time before updating the UI in that case, but not block subsequent ops.
      uiTimeout = new Promise(resolve => setTimeout(resolve, 800));
      return context.setConfigValue(name, value);
    });
    await uiTimeout;
  };

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
            { class: 'pure-u-2-3' },
            h(Preview, {
              getPreview: () =>
                scheduleOp(context => context.capturePreviewAsBlob())
            })
          ),
          h(
            'div',
            { id: 'config', class: 'pure-u-1-3' },
            h(
              'form',
              { class: 'pure-form pure-form-aligned' },
              h(CaptureButton, null),
              h(Widget, { config: state.config, setValue: this.setValue })
            )
          )
        );
    }
  }
}

render(h(App, null), document.body);
