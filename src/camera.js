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

/**
 * @typedef {import('./libapi.mjs').Config} Config
 * @typedef {import('./libapi.mjs').SupportedOps} SupportedOps
 * @typedef {import('./libapi.mjs').Context} Context
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

/**
 * This class provides methods for interacting with the camera.
 */
class Camera {
  constructor() {
    /** @type {Promise<unknown>} */
    this.queue = Promise.resolve();
    this.Module = null;
    this.context = null;
    this.ModulePromise = null;
  }

  /**
   * This method shows the camera picker.
   * @returns {Promise<void>}
   */
  async showCameraPicker() {
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

  /**
   * This method connects to the camera.
   * @returns {Promise<void>}
   */
  async connect() {
    if (!this.ModulePromise) {
      this.ModulePromise = initModule()
    }
    this.Module = await this.ModulePromise;
    this.context = await new this.Module.Context();
  }

  /**
   * This method schedules an exclusive async operation on the global context.
   * @template T
   * @param {(ctx: Context) => Promise<T>} op
   * @returns {Promise<T>}
   * @private
   */
  async schedule(op) {
    let res = this.queue.then(() => op(this.context));
    this.queue = res.catch(rethrowIfCritical);
    return res;
  }

  /**
   * This method disconnects from the camera.
   * @returns {Promise<void>}
   */
  async disconnect() {
    if (!this.context.isDeleted()) {
      this.context.delete();
    }
  }

  /**
   * This method gets the camera configuration.
   * @returns {Promise<Config>}
   */
  async getConfig() {
    return this.schedule((context) => context.configToJS());
  }

  /**
   * This method gets the supported operations of the camera.
   * @returns {Promise<SupportedOps>}
   */
  async getSupportedOps() {
    if (this.context) {
      return await this.context.supportedOps();
    }
    throw new Error("You need to connect to the camera first");
  }

  /**
   * This method sets a configuration value on the camera.
   * @param {string} name
   * @param {number | string | boolean} value
   * @returns {Promise<void>}
   */
  async setConfigValue(name, value) {
    const uiTimeout = new Promise((resolve) => setTimeout(resolve, 800));
    const setResult = this.schedule((context) =>
      context.setConfigValue(name, value)
    );
    return Promise.all([setResult, uiTimeout]);
  }

  /**
   * This method captures a preview as a Blob.
   * @returns {Promise<Blob>}
   */
  async capturePreviewAsBlob() {
    return this.schedule((context) => context.capturePreviewAsBlob());
  }

  /**
   * This method captures an image as a File.
   * @returns {Promise<File>}
   */
  async captureImageAsFile() {
    return this.schedule((context) => context.captureImageAsFile());
  }

  /**
   * This method consumes camera events.
   * @returns {Promise<boolean>}
   */
  async consumeEvents() {
    return this.schedule((context) => context.consumeEvents());
  }
}

export default Camera;
