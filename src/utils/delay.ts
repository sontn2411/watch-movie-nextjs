/**
 * Simple utility to force a delay (sleep) in async functions.
 * @param ms - Milliseconds to wait
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
