import { renderHook } from "@testing-library/react-hooks";
import { expect, it } from "vitest";

export const stableReference = <T>(hook: () => T, text?: string) =>
  it(text ?? `should have stable reference`, () => {
    const hookResult = renderHook(hook);
    hookResult.rerender();

    const value = hookResult.result.current;
    expect(
      hookResult.result.all.every((currentValue) => value === currentValue)
    ).toBe(true);
  });
