import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import { stableReference } from "./test/stableReference";
import { useConstant } from "./useConstant";

describe("useConstant", () => {
  it(`should be 5`, () =>
    expect(renderHook(() => useConstant(() => 5)).result.current).toEqual(5));

  stableReference(() => useConstant(() => 5));
  stableReference(() => useConstant(() => ({})));

  it(`should preserve value reference`, () => {
    const value = {};

    const hookResult = renderHook(() => useConstant(() => value));

    expect(hookResult.result.current).toBe(value);
  });
  it(`should execute function once`, () => {
    let count = 0;

    renderHook(() => useConstant(() => (count += 1)));

    expect(count).toBe(1);
  });
});
