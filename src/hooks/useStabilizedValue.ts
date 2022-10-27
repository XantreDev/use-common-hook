import deepEqual from "fast-deep-equal/es6";
import { useMemoCompare } from "./useMemoCompare";

/**
 * @description Commits a reference to a value if the objects
 * are equivalent in a deep comparison
 */
export const useStabilizedValue = <T>(value: T) =>
  useMemoCompare(value, deepEqual);
