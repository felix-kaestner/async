/**
 * Create a promise which is resolved after the given milliseconds
 *
 * @public
 * @param timeout - the number of milliseconds to suspend
 * @returns a Promise which resolves to `undefined`
 */
export function sleep(timeout: number): Promise<undefined> {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

/**
 * Execute a async function an resolve it's promise with a given timeout.
 *
 * @public
 * @param block - the builder function to execute
 * @param timeout - the number of milliseconds to wait for the builder to resolve
 * @returns a Promise which resolves to the result of the block or undefined if the execution exceeds the timeout
 */
export function withTimeout<T>(
  block: () => Promise<T>,
  timeout: number
): Promise<T | undefined> {
  return Promise.race([block(), sleep(timeout)])
}

/**
 * Execute a async function an resolve it's promise with a after at least a given amount of time.
 *
 * @remarks
 * This helper function can be used to avoid to quick layout changes when using {@link https://reactjs.org/docs/concurrent-mode-intro.html | Concurrent Mode}
 * and {@link https://reactjs.org/docs/concurrent-mode-suspense.html | Suspense}. It is exactly the opposite to {@link withTimeout}.
 *
 * @public
 * @param block - the builder function to execute
 * @param timeout - the number of milliseconds to wait at least, before builder resolves
 * @returns a Promise which resolves to the result of the block after a least the given amount of milliseconds have passed.
 */
export function withDelay<T>(
  block: () => Promise<T>,
  timeout: number
): Promise<T> {
  return new Promise((resolve, reject) => {
    Promise.allSettled([block(), sleep(timeout)]).then(([result]) => {
      if (result.status === 'fulfilled') resolve(result.value)
      else reject(result.reason)
    }, reject)
  })
}
