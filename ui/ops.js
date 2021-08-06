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
   * @template T,T2
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
