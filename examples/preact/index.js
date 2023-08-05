/*
 * Copyright 2021 Google LLC
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA
 */

import { h, render, Component } from 'preact';
import { CaptureButton } from './capture-button.js';
import { connect, rethrowIfCritical } from './ops.js';
import { Preview } from './preview.js';
import { Widget } from './widget.js';

/** @typedef {import('./build/libapi.mjs').Context} Context */
/** @typedef {import('./build/libapi.mjs').Config} Config */
/** @typedef {import('./ops.js').Connection} Connection */

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
    this.setState({ type: 'Status', message: '⌛ Loading...' });
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
    this.setState({ type: 'Status', message: '⌛ Connecting...' });
    await this.tryToConnectToCamera();
  };

  async tryToConnectToCamera() {
    try {
      this.connection = await connect();
    } catch (e) {
      console.warn(e);
      this.setState({ type: 'CameraPicker' });
      return;
    }
    // We should reach this only once.
    while (this.connection) {
      try {
        let config = await this.connection.schedule(context =>
          context.configToJS()
        );
        if (!isDebug) {
          delete config.children.actions;
          delete config.children.other;
        }
        this.setState({
          type: 'Config',
          config
        });
      } catch (err) {
        rethrowIfCritical(err);
        console.error('Could not refresh config:', err);
      }
      while (true) {
        await new Promise(resolve =>
          requestIdleCallback(resolve, { timeout: 500 })
        );
        try {
          let hadEvents = await this.connection.schedule(context =>
            context.consumeEvents()
          );
          if (hadEvents) {
            break;
          }
        } catch (err) {
          rethrowIfCritical(err);
          console.error('Could not consume events:', err);
        }
      }
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
          h(
            'div',
            {
              class: 'center'
            },
            h('input', {
              type: 'button',
              onclick: this.selectDevice,
              value: '🔍 Select camera'
            }),
            h(
              'p',
              null,
              "Don't know how you got here? Check out the ",
              h(
                'a',
                { href: 'https://web.dev/porting-libusb-to-webusb/' },
                'blog post'
              ),
              ' or the ',
              h(
                'a',
                { href: 'https://github.com/GoogleChromeLabs/web-gphoto2' },
                'repo'
              ),
              '!'
            )
          )
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
              getPreview: this.connection.supportedOps.capturePreview
                ? this.capturePreview
                : undefined
            })
          ),
          h(
            'div',
            { id: 'config', class: 'pure-u-1-3' },
            h(
              'form',
              { class: 'pure-form pure-form-aligned' },
              h(
                'fieldset',
                null,
                this.connection.supportedOps.triggerCapture
                  ? h(CaptureButton, { getFile: this.captureImage })
                  : undefined,
                ' ',
                h(
                  'a',
                  {
                    class: 'pure-button',
                    href: 'https://github.com/GoogleChromeLabs/web-gphoto2',
                    target: '_blank'
                  },
                  '⭐ Star on Github'
                )
              ),
              h(Widget, { config: state.config, setValue: this.setValue })
            )
          )
        );
    }
  }
}

render(h(App, null), document.body);
