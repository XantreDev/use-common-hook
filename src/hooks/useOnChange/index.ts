import { useRef } from "react";
import { useIsFirstCall } from "../useIsFirstCall";

export const useOnChangeWithoutInit = <T>({
  comparer,
  deps,
  onChange,
}: {
  deps: T;
  comparer: (a: T, b: T) => boolean;
  onChange: (value: T) => void;
}): void => {
  const prevDeps = useRef(deps);

  if (prevDeps.current !== deps && !comparer(prevDeps.current, deps)) {
    onChange(deps);
    prevDeps.current = deps;
  }
};

export const useOnChange = <T>({
  comparer,
  deps,
  onChange,
}: {
  deps: T;
  comparer: (a: T, b: T) => boolean;
  onChange: (value: T) => void;
}): void => {
  if (useIsFirstCall()()) {
    onChange(deps);
  }

  useOnChangeWithoutInit({ comparer, deps, onChange });
};