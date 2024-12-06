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

import { h, hydrate, Component } from 'preact';
import { CaptureButton } from './capture-button.js';
import { Camera, rethrowIfCritical } from 'web-gphoto2';
import { Preview } from './preview.js';
import { Widget } from './widget.js';

export const isDebug = new URLSearchParams(location.search).has('debug');

if (isDebug) {
  // @ts-ignore
  await import('preact/debug');
}

/** @extends Component<{}, AppState> */
class App extends Component {
  /** @type {Camera | undefined} */
  camera;

  // Make sure that first render hydrates the existing HTML smoothly.
  state = { type: 'Status', message: '⌛ Loading...' };

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
        if (!this.camera) return;
        this.camera.disconnect();
        this.camera = undefined;
      },
      { once: true }
    );
    // Try to connect to camera at startup.
    // If none is found among saved connections, it will fallback to a picker.
    this.tryToConnectToCamera();
  }

  selectDevice = async () => {
    // @ts-ignore
    await Camera.showPicker();
    this.setState({ type: 'Status', message: '⌛ Connecting...' });
    await this.tryToConnectToCamera();
  };

  async tryToConnectToCamera() {
    /** @type {Camera} */
    let camera;
    try {
      camera = new Camera();
      await camera.connect();
    } catch (e) {
      console.warn(e);
      this.setState({ type: 'CameraPicker' });
      return;
    }
    this.camera = camera;
    let supportedOps = await camera.getSupportedOps();
    let capturePreview;
    if (supportedOps.capturePreview) {
      capturePreview = () => camera.capturePreviewAsBlob();
    }
    let triggerCapture;
    if (supportedOps.captureImage) {
      triggerCapture = () => camera.captureImageAsFile();
    }
    // We should reach this only once.
    while (this.camera) {
      try {
        let config = await this.camera.getConfig();
        if (!isDebug) {
          delete config.children.actions;
          delete config.children.other;
        }
        this.setState({
          type: 'Config',
          config,
          capturePreview,
          triggerCapture
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
          let hadEvents = await this.camera.consumeEvents();
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
  setValue = async (name, value) => this.camera?.setConfigValue(name, value);

  render(/** @type {App['props']} */ props, /** @type {App['state']} */ state) {
    switch (state.type) {
      case 'CameraPicker':
        return h(
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
        );
      case 'Status':
        return h('div', { class: 'center' }, state.message);
      case 'Config':
        return h(
          'div',
          { class: 'pure-g' },
          h(
            'div',
            { class: 'pure-u-2-3' },
            h(Preview, {
              getPreview: state.capturePreview
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
                state.triggerCapture
                  ? h(CaptureButton, { getFile: state.triggerCapture })
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

hydrate(h(App, null), document.body);
