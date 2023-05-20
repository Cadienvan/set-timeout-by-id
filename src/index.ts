type TimeoutFn = (...args: any[]) => any;
type TimeoutKey = string | number | symbol;

const internalTimeouts = new Map<
  TimeoutKey,
  number | ReturnType<typeof setTimeout>
>();

export const setTimeoutById = (
  fn: TimeoutFn,
  delay = 0,
  key: TimeoutKey
): void => {
  if (!key) throw new Error('setTimeoutById requires a key');
  if (!internalTimeouts.has(key)) {
    internalTimeouts.set(key, setTimeout(fn, delay));
    setTimeout(() => {
      internalTimeouts.delete(key);
    }, delay);
  }
};

export const clearTimeoutById = (key: string): void => {
  const timeoutId = internalTimeouts.get(key);
  if (timeoutId) {
    clearTimeout(timeoutId);
    internalTimeouts.delete(key);
  }
};
