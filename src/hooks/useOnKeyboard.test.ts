import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";
import { useOnKeydown } from "./useOnKeydown";

/** Don't know how to test good */
describe("useOnKeyboard", () => {
  it(`works`, () =>
    expect(renderHook(() => useOnKeydown()).result.error).toBe(undefined));
});
