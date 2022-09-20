import { useRef } from "react";

export const useActualRef = <T>(actualValue: T) => {
  const ref = useRef(actualValue);
  ref.current = actualValue;

  return ref;
};
