import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import { stableReference } from "./test/stableReference";
import { useStateWithGetter } from "./useStateWithGetter";

const testWithGetter = <T>({ state, getter }: { state: T; getter: () => T }) =>
  expect(state).toBe(getter());

describe(`useStateWithGetter`, () => {
  it(`value should be equal to getter`, () =>
    testWithGetter(renderHook(() => useStateWithGetter({})).result.current));

  it(`value should be equal to getter (initial callback)`, () =>
    testWithGetter(
      renderHook(() => useStateWithGetter(() => ({}))).result.current
    ));

  it(`should get actual value`, async () => {
    const resultHook = renderHook(() => useStateWithGetter(0));

    const result = resultHook.waitFor(
      () => resultHook.result.current.state === 3
    );
    const { state, getter, setter } = resultHook.result.current;
    setter((value) => value + 1);
    expect(getter()).toBe(state + 1);

    setter((value) => value + 1);
    setter((value) => value + 1);

    expect(getter()).toBe(state + 3);
    await result;
    expect(getter()).toBe(resultHook.result.current.state);
    expect(resultHook.result.current.getter()).toBe(
      resultHook.result.current.state
    );
  });

  stableReference(
    () => useStateWithGetter({}).getter,
    `getter should have stable reference`
  );
  stableReference(
    () => useStateWithGetter({}).setter,
    `setter should have stable reference`
  );
  stableReference(
    () => useStateWithGetter({}).state,
    `state should have stable reference`
  );
});
