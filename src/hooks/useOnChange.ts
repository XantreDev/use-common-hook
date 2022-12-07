import { useRef } from "react";
import { is } from "../utils/objectFunctions";
import { useIsFirstCall } from "./useIsFirstCall";

export const useOnChangeWithoutInit = <T>({
  comparer = is,
  deps,
  onChange,
}: {
  deps: T;
  comparer?: (a: T, b: T) => boolean;
  onChange: (value: T) => void;
}): void => {
  const prevDeps = useRef(deps);

  if (!is(prevDeps.current, deps) && !comparer(prevDeps.current, deps)) {
    onChange(deps);
    prevDeps.current = deps;
  }
};

/**
 *
 * @deprecated useOnMount + useOnChangeWithoutInit
 */
export const useOnChange = <T>({
  comparer = is,
  deps,
  onChange,
}: {
  deps: T;
  comparer?: (a: T, b: T) => boolean;
  onChange: (value: T) => void;
}): void => {
  if (useIsFirstCall()()) {
    onChange(deps);
  }

  useOnChangeWithoutInit({ comparer, deps, onChange });
};
