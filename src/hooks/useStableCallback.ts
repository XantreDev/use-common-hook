import { useCallback, useRef } from "react";

/**
 * @description Return a callback that have the same behavior as the original callback,
 * but with stable reference.
 */
export const useStableCallback = <T extends (...args: any[]) => any>(
  callback: T
) => {
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  return useCallback(
    (...args: Parameters<T>) => callbackRef.current(...args),
    []
  ) as T;
};
