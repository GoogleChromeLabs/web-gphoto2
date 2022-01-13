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

import { h, Component, Fragment } from 'preact';

/** @extends Component<{ getFile: () => Promise<File> }, { status: string }> */
export class CaptureButton extends Component {
  state = { status: '📷' };

  handleCapture = async () => {
    this.setState({ status: '⌛' });
    try {
      let file = await this.props.getFile();
      let url = URL.createObjectURL(file);
      Object.assign(document.createElement('a'), {
        download: file.name,
        href: url
      }).click();
      URL.revokeObjectURL(url);
      this.setState({ status: '📷' });
    } catch (err) {
      console.error(err);
      this.setState({ status: '❌' });
    }
  };

  render() {
    return h(
      Fragment,
      null,
      h('input', {
        type: 'button',
        id: 'capture',
        disabled: this.state.status !== '📷',
        class: 'pure-button',
        onclick: this.handleCapture,
        value: `${this.state.status} Capture image`
      })
    );
  }
}
