import { expect, test } from "vitest";
import { shallowEqual } from "./shallowEqual";

test("shallow equal", () => {
  expect(shallowEqual(undefined, false)).toBe(false);
  expect(shallowEqual(NaN, null)).toBe(false);
  expect(shallowEqual(undefined, null)).toBe(false);

  expect(shallowEqual(null, null)).toBe(true);
  expect(shallowEqual(undefined, undefined)).toBe(true);
  expect(shallowEqual(1, 1)).toBe(true);
  expect(shallowEqual(NaN, NaN)).toBe(true);

  expect(shallowEqual([], [])).toBe(true);
  expect(shallowEqual([1, 2], [1, 2])).toBe(true);
  expect(shallowEqual([1, 2], [1, 2, 3])).toBe(false);
  expect(shallowEqual([1, 2, 3], [1, 2])).toBe(false);
  expect(shallowEqual([1, 2], [1, 4])).toBe(false);
  expect(shallowEqual([1, 4], [1, 2])).toBe(false);

  expect(shallowEqual([], {})).toBe(false);
  expect(shallowEqual([1, 2], { 0: 1, 1: 2 })).toBe(false);
  expect(shallowEqual({ 1: 1, 2: 1 }, { 0: 1, 1: 2 })).toBe(false);
  expect(shallowEqual({ 0: 1, 1: 2 }, { 0: 1, 1: 2 })).toBe(true);
});
