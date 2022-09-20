import deepEqual from "fast-deep-equal/es6";
import {
  useOnChange as useOnChangeDefault,
  useOnChangeWithoutInit as useOnChangeWithoutInitDefault,
} from ".";

export const useOnChangeWithoutInit = <T>({
  comparer = deepEqual,
  ...props
}: {
  deps: T;
  comparer?: (a: T, b: T) => boolean;
  onChange: (value: T) => void;
}): void => useOnChangeWithoutInitDefault({ comparer, ...props });

export const useOnChange = <T>({
  comparer = deepEqual,
  ...props
}: {
  deps: T;
  comparer?: (a: T, b: T) => boolean;
  onChange: (value: T) => void;
}): void => useOnChangeDefault({ comparer, ...props });
