export const retryPromise = (
  fn: () => Promise<any>,
  ms = 1000,
  maxRetries = 5,
  retries = 0,
  // eslint-disable-next-line @typescript-eslint/ban-types
  rejectFn: Function | undefined = undefined,
) => {
  return new Promise((resolve, reject) => {
    if (!rejectFn) {
      rejectFn = reject;
    }
    fn()
      .then(resolve)
      .catch(() => {
        setTimeout(() => {
          console.log("retrying failed promise...", retries);
          ++retries;
          if (retries === maxRetries) {
            return rejectFn && rejectFn("maximum retries exceeded");
          }
          retryPromise(fn, ms, maxRetries, retries, rejectFn).then(resolve);
        }, ms);
      });
  });
};
