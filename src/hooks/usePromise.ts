import { useDebugValue, useEffect } from "react";

const cache = new Map<
  symbol,
  { result: any; error: any; removeTimeout?: undefined | number }
>();

const usePromiseInternal = <T>(
  promiseGetter: () => Promise<T>,
  symbol: symbol
): T => {
  useEffect(() => {
    const timeout = cache.get(symbol)?.removeTimeout;
    clearTimeout(timeout);

    return () => {
      const cacheData = cache.get(symbol);
      const timeout = setTimeout(() => cache.delete(symbol), 1_000);
      if (cacheData) {
        cacheData.removeTimeout = timeout;
      }
    };
  }, []);

  const possibleResult = cache.get(symbol);
  useDebugValue(possibleResult?.result);
  if (possibleResult) {
    const { error, result } = possibleResult;

    if (error) throw error;
    return result;
  }

  const promise = promiseGetter()
    .then((result) => cache.set(symbol, { result, error: null }))
    .catch((error) => cache.set(symbol, { error, result: null }));

  throw promise;
};

export const createUsePromise = () => {
  const symbol = Symbol("promise symbol");

  const usePromise = <T>(promiseGetter: () => Promise<T>) =>
    usePromiseInternal(promiseGetter, symbol);

  return usePromise;
};
