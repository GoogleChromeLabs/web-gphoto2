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
import initModule from '../build/libapi.mjs';
// A helper that allows to distinguish critical errors from library errors.
export function rethrowIfCritical(err) {
    // If it's precisely Error, it's a custom error; anything else - SyntaxError,
    // WebAssembly.RuntimeError, TypeError, etc. - is treated as critical here.
    if (err?.constructor !== Error) {
        throw err;
    }
}
const INTERFACE_CLASS = 6; // PTP
const INTERFACE_SUBCLASS = 1; // MTP
let ModulePromise;
export class Camera {
    #queue = Promise.resolve();
    #context = null;
    static async showPicker() {
        // @ts-ignore
        await navigator.usb.requestDevice({
            filters: [
                {
                    classCode: INTERFACE_CLASS,
                    subclassCode: INTERFACE_SUBCLASS
                }
            ]
        });
    }
    async connect() {
        if (!ModulePromise) {
            ModulePromise = initModule();
        }
        let Module = await ModulePromise;
        this.#context = await new Module.Context();
    }
    async #schedule(op) {
        let res = this.#queue.then(() => op(this.#context));
        this.#queue = res.catch(rethrowIfCritical);
        return res;
    }
    async disconnect() {
        if (this.#context && !this.#context.isDeleted()) {
            this.#context.delete();
        }
    }
    async getConfig() {
        return this.#schedule(context => context.configToJS());
    }
    async getSupportedOps() {
        if (this.#context) {
            return await this.#context.supportedOps();
        }
        throw new Error('You need to connect to the camera first');
    }
    async setConfigValue(name, value) {
        let uiTimeout;
        await this.#schedule(context => {
            // This is terrible, yes... but some configs return too quickly before they're actually updated.
            // We want to wait some time before updating the UI in that case, but not block subsequent ops.
            uiTimeout = new Promise(resolve => setTimeout(resolve, 800));
            return context.setConfigValue(name, value);
        });
        await uiTimeout;
    }
    async capturePreviewAsBlob() {
        return this.#schedule(context => context.capturePreviewAsBlob());
    }
    async captureImageAsFile() {
        return this.#schedule(context => context.captureImageAsFile());
    }
    async consumeEvents() {
        return this.#schedule(context => context.consumeEvents());
    }
}
