import {
  useOnChange as useOnChangeDefault,
  useOnChangeWithoutInit as useOnChangeWithoutInitDefault,
} from ".";
import { shallowEqual } from "../../utils/shallowEqual";

export const useOnChangeWithoutInit = <T>({
  comparer = shallowEqual,
  ...props
}: {
  deps: T;
  comparer?: (a: T, b: T) => boolean;
  onChange: (value: T) => void;
}): void => useOnChangeWithoutInitDefault({ comparer, ...props });

export const useOnChange = <T>({
  comparer = shallowEqual,
  ...props
}: {
  deps: T;
  comparer?: (a: T, b: T) => boolean;
  onChange: (value: T) => void;
}): void => useOnChangeDefault({ comparer, ...props });
