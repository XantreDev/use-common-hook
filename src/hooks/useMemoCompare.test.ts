import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import { useMemoCompare } from "./useMemoCompare";

describe(`useMemoCompare`, () => {
  it(`should return same value as provided`, () => {
    expect(
      renderHook(() => useMemoCompare(220, () => true)).result.current
    ).toBe(220);
  });
  it(`should return old value if callback comparer said that values same`, () => {
    const result = renderHook((props) => useMemoCompare(props, () => true), {
      initialProps: 220,
    });

    const value1 = result.result.current;

    result.rerender(330);
    result.rerender(5_000);
    expect(result.result.current).toBe(value1);
  });
  it(`should return new value if callback comparer said that values different`, () => {
    const result = renderHook((props) => useMemoCompare(props, () => false), {
      initialProps: 220,
    });

    result.rerender(330);
    expect(result.result.current).toBe(330);
  });
});
