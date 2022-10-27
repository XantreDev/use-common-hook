import { useRef } from "react";

export const useMemoCompare = <T>(
  value: T,
  isEqual: (prev: T, next: T) => boolean
) => {
  const memoizedValueRef = useRef(value);

  if (!isEqual(memoizedValueRef.current, value)) {
    memoizedValueRef.current = value;
  }

  return memoizedValueRef.current;
};
