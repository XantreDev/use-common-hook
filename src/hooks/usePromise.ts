import { useDebugValue, useEffect } from "react";
import { EMPTY_SYMBOL } from "../constants";

type CacheNode = {
  result: any | typeof EMPTY_SYMBOL;
  error: any | typeof EMPTY_SYMBOL;
  removeTimeout: undefined | number | NodeJS.Timeout;
  promise: Promise<any> | typeof EMPTY_SYMBOL;
};

const cache = new Map<symbol, CacheNode>();

const createInitCache = (): CacheNode => ({
  error: EMPTY_SYMBOL,
  removeTimeout: undefined,
  promise: EMPTY_SYMBOL,
  result: EMPTY_SYMBOL,
});

const cacheSet =
  <Key extends keyof CacheNode>(symbol: symbol, key: Key) =>
  (value: CacheNode[Key]) => {
    const currentCache = cache.get(symbol);
    if (currentCache) {
      return (currentCache[key] = value);
    }

    cache.set(symbol, createInitCache());
    cacheSet(symbol, key)(value);
  };

const usePromiseInternal = <T>(
  promiseGetter: () => Promise<T>,
  symbol: symbol
): T => {
  useEffect(() => {
    const timeout = cache.get(symbol)?.removeTimeout;
    clearTimeout(timeout);

    return () => {
      const timeout = setTimeout(() => cache.delete(symbol), 1_000);
      const cacheData = cache.get(symbol);
      if (cacheData) {
        cacheData.removeTimeout = timeout;
      }
    };
  }, []);

  const possibleResult = cache.get(symbol);
  useDebugValue(possibleResult?.result);

  if (possibleResult && possibleResult?.error !== EMPTY_SYMBOL) {
    throw possibleResult.error;
  }
  if (possibleResult && possibleResult?.result !== EMPTY_SYMBOL)
    return possibleResult.result;
  if (possibleResult && possibleResult?.promise !== EMPTY_SYMBOL)
    throw possibleResult.promise;

  cache.set(symbol, createInitCache());
  const promise = promiseGetter()
    .then(cacheSet(symbol, "result"))
    .catch(cacheSet(symbol, "error"));
  cacheSet(symbol, "promise")(promise);

  throw promise;
};

export const createUsePromise = () => {
  const symbol = Symbol("promise symbol");

  const usePromise = <T>(promiseGetter: () => Promise<T>) =>
    usePromiseInternal(promiseGetter, symbol);

  return usePromise;
};
