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


/** @typedef {import('./libapi.mjs').Context} Context */

// To avoid errors for users who use SSR or Hybrid rendering (e.g. Nuxt.js), we need to check if we're in the browser.
let initModule;

async function initializeModule() {
    if (typeof window !== 'undefined') {
        const module = await import('./libapi.mjs');
        initModule = module.default;
        return initModule;
    } else {
        console.warn("web-gphoto2 is only available in the browser");
        return null;
    }
}

const ModulePromise = initializeModule().then(initModule => {
    if (initModule) {
        return initModule();
    } else {
        return null;
    }
});

class Camera {
    constructor() {
        /** @type {Promise<unknown>} */
        this.queue = Promise.resolve();
        this.Module = null;
        this.context = null;
    }

    rethrowIfCritical(err) {
        // If it's precisely Error, it's a custom error; anything else - SyntaxError,
        // WebAssembly.RuntimeError, TypeError, etc. - is treated as critical here.
        if (err.constructor !== Error) {
            throw err;
        }
    }

    async connect() {
        this.Module = await ModulePromise;
        this.context = await new this.Module.Context();
    }

    /** Schedules an exclusive async operation on the global context.
     * @template T
     * @param {(ctx: Context) => Promise<T>} op
     * @returns {Promise<T>}
     */
    async schedule(op) {
        let res = this.queue.then(() => op(this.context));
        this.queue = res.catch(this.rethrowIfCritical);
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
        const setResult = this.schedule((context) => context.setConfigValue(name, value));
        // wait for both the config set operation and the timeout to complete
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

export default Camera;
