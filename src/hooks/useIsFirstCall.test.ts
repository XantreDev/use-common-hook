import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import { stableReference } from "./test/stableReference";
import { useIsFirstCall } from "./useIsFirstCall";

describe("useIsFirstCall", () => {
  it(`should be true when first call`, () =>
    expect(renderHook(() => useIsFirstCall()()).result.current).toEqual(true));

  stableReference(() => useIsFirstCall());

  it(`should be false when second call`, () => {
    const renderResult = renderHook(() => useIsFirstCall()());
    renderResult.rerender();

    expect(renderResult.result.all.at(1)).toBe(false);

    const {
      result: { current: secondCallResult },
    } = renderHook(() => {
      const isFirstCall = useIsFirstCall();
      isFirstCall();
      return isFirstCall();
    });
    expect(secondCallResult).toBe(false);
  });
});
