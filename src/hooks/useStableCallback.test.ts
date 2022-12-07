import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import { stableReference } from "./test/stableReference";
import { useStableCallback } from "./useStableCallback";

describe(`useStableCallback`, () => {
  stableReference(
    () => useStableCallback(() => {}),
    `should be stable on each render`
  );

  it(`should do same thing`, () => {
    const callback = () => 10;
    expect(renderHook(() => useStableCallback(callback)()).result.current).toBe(
      callback()
    );
  });
  it(`should be actual`, () => {
    const INITIAL_VALUE = 10;
    const renderResult = renderHook(
      (someNumber: number) => useStableCallback(() => someNumber),
      {
        initialProps: INITIAL_VALUE,
      }
    );
    const firstRenderCallback = renderResult.result.current;
    const value = firstRenderCallback();
    expect(value).toBe(10);

    const secondRenderCallback = renderResult.result.current;
    const NEW_VALUE = 220;
    renderResult.rerender(NEW_VALUE);
    expect(firstRenderCallback()).toBe(NEW_VALUE);
    expect(firstRenderCallback).toBe(secondRenderCallback);
    expect(firstRenderCallback()).toBe(secondRenderCallback());
  });
});
