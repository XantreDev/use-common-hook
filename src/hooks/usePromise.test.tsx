import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import { wait } from "../test/utils";
import { createUsePromise } from "./usePromise";

describe(`usePromise`, () => {
  it(`should unwrap promise`, async () => {
    const usePromise = createUsePromise();

    const PROMISE_RESULT = 220;
    const hookResult = renderHook(() => usePromise(async () => PROMISE_RESULT));
    await hookResult.waitFor(() => !!hookResult.result.current, {
      timeout: 1_000,
    });

    expect(hookResult.result.current).toBe(PROMISE_RESULT);
  });
  it(`should unwrap long promise`, async () => {
    const usePromise = createUsePromise();

    const PROMISE_RESULT = {};
    const longPromise = () =>
      new Promise((resolve) => setTimeout(() => resolve(PROMISE_RESULT), 500));
    const hookResult = renderHook(() => usePromise(longPromise));
    await hookResult.waitFor(() => !!hookResult.result.current, {
      timeout: 1_000,
    });

    expect(hookResult.result.current).toBe(PROMISE_RESULT);
  });
  it(`should persist value while rerender`, async () => {
    const usePromise = createUsePromise();

    const PROMISE_RESULT = {};
    const hookResult = renderHook(() => usePromise(async () => PROMISE_RESULT));
    await hookResult.waitFor(() => !!hookResult.result.current, {
      timeout: 1_000,
    });

    hookResult.rerender();
    hookResult.rerender();
    hookResult.rerender();
    hookResult.rerender();

    expect(hookResult.result.current).toBe(PROMISE_RESULT);
  });
  it(`should call function once`, async () => {
    const usePromise = createUsePromise();
    let countOfTimesGetPromiseFunctionCalled = 0;

    const PROMISE_RESULT = {};
    const hookResult = renderHook(() =>
      usePromise(
        async () => (countOfTimesGetPromiseFunctionCalled++, PROMISE_RESULT)
      )
    );
    await hookResult.waitFor(() => !!hookResult.result.current, {
      timeout: 1_000,
    });

    hookResult.rerender();
    hookResult.rerender();
    hookResult.rerender();

    expect(countOfTimesGetPromiseFunctionCalled).toBe(1);
  });
  it(`should dedupe promise function call on small amount of time`, async () => {
    const usePromise = createUsePromise();
    let countOfTimesGetPromiseFunctionCalled = 0;

    const PROMISE_RESULT = {};
    const hookResult = renderHook(() =>
      usePromise(
        async () => (countOfTimesGetPromiseFunctionCalled++, PROMISE_RESULT)
      )
    );
    await hookResult.waitFor(() => !!hookResult.result.current, {
      timeout: 1_000,
    });

    hookResult.unmount();

    await wait(200);
    hookResult.rerender();
    hookResult.rerender();
    hookResult.rerender();

    expect(countOfTimesGetPromiseFunctionCalled).toBe(1);
  });
  it(`should reevaluate promise function big amount of time`, async () => {
    const usePromise = createUsePromise();
    let countOfTimesGetPromiseFunctionCalled = 0;

    const hookResult = renderHook(() =>
      usePromise(async () => ++countOfTimesGetPromiseFunctionCalled)
    );
    await hookResult.waitFor(() => !!hookResult.result.current, {
      timeout: 1_000,
    });
    const firstPromiseResult = hookResult.result.current;

    hookResult.unmount();

    await wait(2_000);
    hookResult.rerender();
    hookResult.rerender();
    hookResult.rerender();
    await hookResult.waitForNextUpdate();

    const secondPromiseResult = hookResult.result.current;

    expect(firstPromiseResult !== secondPromiseResult).toBe(true);
    expect(countOfTimesGetPromiseFunctionCalled).toBe(2);
  });
});
