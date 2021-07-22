import { h, render, Component } from 'preact';
import { CaptureButton } from './capture-button.js';
import { connect } from './ops.js';
import { Preview } from './preview.js';
import { Widget } from './widget.js';

/** @typedef {import('../libapi.mjs').Context} Context */
/** @typedef {import('../libapi.mjs').Config} Config */
/** @typedef {import('./ops').Connection} Connection */

export const isDebug = new URLSearchParams(location.search).has('debug');

if (isDebug) {
  await import('preact/debug');
}

/** @typedef {{ type: 'CameraPicker' } | { type: 'Status', message: string } | { type: 'Config', config: Config }} AppState */

const INTERFACE_CLASS = 6; // PTP
const INTERFACE_SUBCLASS = 1; // MTP

/** @extends Component<null, AppState> */
class App extends Component {
  /** @type {Connection} */
  connection;

  componentDidMount() {
    addEventListener('error', ({ message }) =>
      this.setState({
        type: 'Status',
        message: `⚠ ${message}`
      })
    );
    addEventListener(
      'beforeunload',
      () => {
        if (!this.connection) return;
        this.connection.disconnect();
        this.connection = undefined;
      },
      { once: true }
    );
    // Try to connect to camera at startup.
    // If none is found among saved connections, it will fallback to a picker.
    this.tryToConnectToCamera();
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
    await this.tryToConnectToCamera();
  };

  async tryToConnectToCamera() {
    this.setState({ type: 'Status', message: 'Connecting...' });
    try {
      this.connection = await connect();
    } catch (e) {
      console.warn(e);
      this.setState({ type: 'CameraPicker' });
      return;
    }
    // We should reach this only once.
    while (this.connection) {
      let config = await this.connection.schedule(context =>
        context.configToJS()
      );
      if (!isDebug) {
        delete config.children.other;
      }
      this.setState({
        type: 'Config',
        config
      });
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  /**
   * Set the specified config value.
   * @param {string} name
   * @param {*} value
   */
  setValue = async (name, value) => {
    /** @type {Promise<void>} */
    let uiTimeout;
    await this.connection.schedule(context => {
      // This is terrible, yes... but some configs return too quickly before they're actually updated.
      // We want to wait some time before updating the UI in that case, but not block subsequent ops.
      uiTimeout = new Promise(resolve => setTimeout(resolve, 800));
      return context.setConfigValue(name, value);
    });
    await uiTimeout;
  };

  capturePreview = () =>
    this.connection.schedule(context => context.capturePreviewAsBlob());

  captureImage = () =>
    this.connection.schedule(context => context.captureImageAsFile());

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
              getPreview: this.capturePreview
            })
          ),
          h(
            'div',
            { id: 'config', class: 'pure-u-1-3' },
            h(
              'form',
              { class: 'pure-form pure-form-aligned' },
              h(CaptureButton, { getFile: this.captureImage }),
              h(Widget, { config: state.config, setValue: this.setValue })
            )
          )
        );
    }
  }
}

render(h(App, null), document.body);
