import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import { usePreviousValue } from "./usePreviousValue";

/** Don't know how to test good */
describe("usePreviousValue", () => {
  it(`should be null on first render`, () =>
    expect(renderHook(usePreviousValue).result.current).toBe(null));

  it(`should be previous value on second render`, () => {
    const value = {};
    const renderResult = renderHook(() => usePreviousValue(value));
    renderResult.rerender();

    expect(renderResult.result.current).toBe(value);
  });

  it(`should be previous value in all keys`, () => {
    const values = Array.from({ length: 5 }).map((__, index) => index);

    const renderResult = renderHook(
      (value: number) => usePreviousValue(value),
      {
        initialProps: values[0],
      }
    );

    values.slice(1).forEach((value) => renderResult.rerender(value));

    expect(
      renderResult.result.all
        .slice(1)
        .every((value, index) => value === values[index])
    ).toBe(true);
  });
});
