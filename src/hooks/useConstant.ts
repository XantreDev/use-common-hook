import { useRef } from "react";
import { EMPTY_SYMBOL } from "../constants";

export const useConstant = <T>(initializer: () => T) => {
  const ref = useRef<T | typeof EMPTY_SYMBOL>(EMPTY_SYMBOL);
  if (ref.current === EMPTY_SYMBOL) {
    ref.current = initializer();
  }

  return ref.current as T;
};
