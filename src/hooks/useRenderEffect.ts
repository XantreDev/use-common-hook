import { useOnChange as useOnChangeDeep } from "./useOnChange/deep";
import { useOnChange } from "./useOnChange/shallow";

export const useRenderEffect = (callback: () => void, deps: unknown[]) =>
  useOnChange({
    deps,
    onChange: callback,
  });

export const useRenderEffectDeep = (callback: () => void, deps: unknown[]) =>
  useOnChangeDeep({
    deps,
    onChange: callback,
  });
