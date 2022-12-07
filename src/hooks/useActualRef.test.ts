import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import { stableReference } from "./test/stableReference";
import { useActualRef } from "./useActualRef";

describe("useActualRef", () => {
  it(`should be 5`, () =>
    expect(renderHook(() => useActualRef(5)).result.current).toEqual({
      current: 5,
    }));

  stableReference(() => useActualRef(5));

  it(`should preserve value reference`, () => {
    const value = {};

    const hookResult = renderHook(() => useActualRef(value));

    expect(hookResult.result.current.current).toBe(value);
  });
});
