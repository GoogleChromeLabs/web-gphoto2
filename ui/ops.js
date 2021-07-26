import initModule from '../libapi.mjs';

/** @typedef {import('../libapi.mjs').Context} Context */

const ModulePromise = initModule();

export async function connect() {
  const Module = await ModulePromise;

  let context = await new Module.Context();
  let supportedOps = await context.supportedOps();

  let queue = Promise.resolve();

  /** Schedules an exclusive async operation on the global context.
   * @template T
   * @param {(ctx: Context) => Promise<T>} op
   * @returns {Promise<T>}
   */
  function schedule(op) {
    let res = queue.then(() => op(context));

    // Queue should ignore result values as well as errors from singular ops.
    queue = res.then(
      () => {},
      () => {}
    );

    // Result should contain the unwrapped value or error.
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
