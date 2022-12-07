import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import { stableReference } from "./test/stableReference";
import { useToggle } from "./useToggle";

describe("useToggle", () => {
  it(`state is false by default`, () =>
    expect(renderHook(() => useToggle()).result.current[0]).toBe(false));
  stableReference(
    () => useToggle()[1],
    `should give setter with stable reference`
  );
  it(`should toggle by call of toggle`, async () => {
    const res = renderHook(() => useToggle());
    const [firstState, toggle] = res.result.current;

    const waiting = res.waitForNextUpdate();
    toggle();

    await waiting;
    expect(firstState).toBe(!res.result.current[0]);
  });
  it(`should toggle by call of toggle`, async () => {
    const res = renderHook(() => useToggle());
    const [firstState, toggle] = res.result.current;

    const waiting = res.waitForNextUpdate();
    toggle();
    toggle();

    await waiting;
    expect(firstState).toBe(res.result.current[0]);
  });
  it(`should not rerender when same value obtained`, () => {
    const res = renderHook(() => useToggle());
    const [, toggle] = res.result.current;

    const expected = {};
    const waiting = res
      .waitForNextUpdate({ timeout: 100 })
      .catch(() => expected);
    toggle(false);

    expect(waiting).resolves.toBe(expected);
  });
  it(`should be true if true is initial value`, () => {
    const res = renderHook(() => useToggle(true));
    const [value] = res.result.current;

    expect(value).toBe(true);
  });
});
