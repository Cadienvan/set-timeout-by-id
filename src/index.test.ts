import { setTimeoutById, clearTimeoutById } from '.';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('setTimeoutById', () => {
  it('should throw an error if no key is provided', () => {
    // @ts-ignore
    expect(() => setTimeoutById(() => {}, 0)).toThrowError(
      'setTimeoutById requires a key'
    );
  });

  it('should call setTimeout with the provided function and delay', async () => {
    let key = 'key-1';
    const fn = jest.fn();
    const delay = 10;
    setTimeoutById(fn, delay, key);
    expect(fn).not.toHaveBeenCalled();
    await sleep(delay);
    expect(fn).toHaveBeenCalled();
  });

  it('should not call setTimeout if the key already exists', async () => {
    let key = 'key-2';
    const fn = jest.fn();
    const delay = 10;
    setTimeoutById(fn, delay, key);
    setTimeoutById(fn, delay, key);
    await sleep(delay);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should call setTimeout twice if the key already exists but time has passed', async () => {
    let key = 'key-3';
    const fn = jest.fn();
    const delay = 10;
    setTimeoutById(fn, delay, key);
    await sleep(delay);
    setTimeoutById(fn, delay, key);
    await sleep(delay);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should call setTimeout if the key is deleted', async () => {
    let key = 'key-4';
    const fn = jest.fn();
    const delay = 10;
    setTimeoutById(fn, delay, key);
    await sleep(delay);
    expect(fn).toHaveBeenCalledTimes(1);
    clearTimeoutById(key);
    setTimeoutById(fn, delay, key);
    await sleep(delay);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
