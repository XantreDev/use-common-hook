import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import { useOnMount } from "./useOnMount";

describe(`useOnMount`, () => {
  it(`should be called 1 if deps is changed`, () => {
    let calledCountOfTimes = 0;

    const hookResult = renderHook(() => useOnMount(() => calledCountOfTimes++));

    hookResult.rerender();
    hookResult.rerender();

    expect(calledCountOfTimes).toBe(1);
  });
  it(`should be called 2 if unmounted and mounted again`, () => {
    let calledCountOfTimes = 0;

    const hookResult = renderHook(() => useOnMount(() => calledCountOfTimes++));

    hookResult.unmount();
    hookResult.rerender();

    expect(calledCountOfTimes).toBe(2);
  });
});
