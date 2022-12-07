import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import { stableReference } from "./test/stableReference";
import { useStabilizedValue } from "./useStabilizedValue";

describe(`useStabilizedValue`, () => {
  stableReference(() => useStabilizedValue({}), `should stabilize value`);
  stableReference(
    () => useStabilizedValue({ 5: 20, 20: 30 }),
    `should stabilize value object`
  );
  stableReference(
    () => useStabilizedValue({ 5: [], 20: [1, 123, , 123, 12] }),
    `should stabilize value nested objects`
  );
  it(`should return actual value`, () => {
    const value = {};

    expect(renderHook(() => useStabilizedValue(value)).result.current).toBe(
      value
    );
  });
});
