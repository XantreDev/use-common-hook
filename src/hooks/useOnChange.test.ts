import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import { useOnChangeWithoutInit } from "./useOnChange";

describe(`useOnChangeWithoutInit`, () => {
  it(`should be called 0 if deps is not changed`, () => {
    let calledCountOfTimes = 0;
    const callback = () => ++calledCountOfTimes;

    renderHook(
      (deps) =>
        useOnChangeWithoutInit({
          deps,
          onChange: callback,
        }),
      {
        initialProps: 0,
      }
    );

    expect(calledCountOfTimes).toBe(0);
  });
  it(`should be called 1 if deps is changed`, () => {
    let calledCountOfTimes = 0;
    const callback = () => ++calledCountOfTimes;

    renderHook(
      (deps) =>
        useOnChangeWithoutInit({
          deps,
          onChange: callback,
        }),
      {
        initialProps: 0,
      }
    ).rerender(10);

    expect(calledCountOfTimes).toBe(1);
  });
});
