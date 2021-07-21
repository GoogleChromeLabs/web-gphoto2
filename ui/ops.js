import initModule from '../libapi.mjs';

/** @typedef {import('../libapi.mjs').Context} Context */

/** This function should be called once user has selected the camera and other operations can begin. */
export let start;

let started = new Promise(resolve => {
  start = resolve;
});

let queue = (async () => {
  let { Context } = await initModule();
  await started;
  let ctx = await new Context();
  addEventListener('beforeunload', e => {
    ctx.delete();
  });
  return ctx;
})();

/** Schedules an exclusive async operation on the global context.
 * @template T
 * @param {(ctx: Context) => Promise<T>} op
 * @returns {Promise<T>}
 */
export function scheduleOp(op) {
  let caughtRes = queue.then(async ctx => {
    let resultPromise = op(ctx);
    try {
      await resultPromise;
    } catch {}
    return {
      ctx,
      resultPromise
    };
  });

  // Queue should ignore result values as well as errors from singular ops.
  queue = caughtRes.then(res => res.ctx);

  // Result should contain the unwrapped value or error.
  return caughtRes.then(res => res.resultPromise);
}
