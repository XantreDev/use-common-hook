import { useRef } from "react";
import { is } from "../utils/objectFunctions";

export const useMemoCompare = <T>(
  value: T,
  isEqual: (prev: T, next: T) => boolean
) => {
  const memoizedValueRef = useRef(value);

  if (
    !is(memoizedValueRef.current, value) &&
    !isEqual(memoizedValueRef.current, value)
  ) {
    memoizedValueRef.current = value;
  }

  return memoizedValueRef.current;
};
