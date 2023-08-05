/*
 * Copyright 2023 Google LLC
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

import initModule from "../build/libapi.mjs";

export function rethrowIfCritical(err) {
  // If it's precisely Error, it's a custom error; anything else - SyntaxError,
  // WebAssembly.RuntimeError, TypeError, etc. - is treated as critical here.
  if (err.constructor !== Error) {
    throw err;
  }
}

const INTERFACE_CLASS = 6; // PTP
const INTERFACE_SUBCLASS = 1; // MTP

let ModulePromise = null;

export class Camera {
  constructor() {
    this.queue = Promise.resolve();
    this.Module = null;
    this.context = null;
  }

  static async showPicker() {
    // @ts-ignore
    await navigator.usb.requestDevice({
      filters: [
        {
          classCode: INTERFACE_CLASS,
          subclassCode: INTERFACE_SUBCLASS,
        },
      ],
    });
  }

  async connect() {
    if (!ModulePromise) {
      ModulePromise = initModule()
    }
    this.Module = await ModulePromise;
    this.context = await new this.Module.Context();
  }

  async schedule(op) {
    let res = this.queue.then(() => op(this.context));
    this.queue = res.catch(rethrowIfCritical);
    return res;
  }

  async disconnect() {
    if (!this.context.isDeleted()) {
      this.context.delete();
    }
  }

  async getConfig() {
    return this.schedule((context) => context.configToJS());
  }

  async getSupportedOps() {
    if (this.context) {
      return await this.context.supportedOps();
    }
    throw new Error("You need to connect to the camera first");
  }

  async setConfigValue(name, value) {
    const uiTimeout = new Promise((resolve) => setTimeout(resolve, 800));
    const setResult = this.schedule((context) =>
      context.setConfigValue(name, value)
    );
    return Promise.all([setResult, uiTimeout]);
  }

  async capturePreviewAsBlob() {
    return this.schedule((context) => context.capturePreviewAsBlob());
  }

  async captureImageAsFile() {
    return this.schedule((context) => context.captureImageAsFile());
  }

  async consumeEvents() {
    return this.schedule((context) => context.consumeEvents());
  }
}