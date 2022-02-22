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

import initModule from '../libapi.mjs';

/** @typedef {import('../libapi.mjs').Context} Context */

const ModulePromise = initModule();

export function rethrowIfCritical(err) {
  // If it's precisely Error, it's a custom error; anything else - SyntaxError,
  // WebAssembly.RuntimeError, TypeError, etc. - is treated as critical here.
  if (err.constructor !== Error) {
    throw err;
  }
}

export async function connect() {
  const Module = await ModulePromise;

  let context = await new Module.Context();
  let supportedOps = await context.supportedOps();

  /** @type {Promise<unknown>} */
  let queue = Promise.resolve();

  /** Schedules an exclusive async operation on the global context.
   * @template T
   * @param {(ctx: Context) => Promise<T>} op
   * @returns {Promise<T>}
   */
  function schedule(op) {
    let res = queue.then(() => op(context));
    queue = res.catch(rethrowIfCritical);
    return res;
  }

  return {
    supportedOps,
    schedule,
    disconnect() {
      context.delete();
    }
  };
}

/** @typedef {ReturnType<typeof connect> extends Promise<infer Connection> ? Connection : never} Connection */
