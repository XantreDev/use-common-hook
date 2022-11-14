import { useEffect } from "react";

import type { Key } from "./../types/keys";
import { useActualRef } from "./useActualRef";

type KeyObject = {
  key: Key;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
};

export type KeyAction = {
  key: KeyObject | Key;
  action: (e: KeyboardEvent) => any | null;
};

const compareKeyAttribute = (
  realValue: boolean,
  matchValue: undefined | boolean
) => typeof matchValue === "undefined" || matchValue === realValue;

const actionsHandler = (actions: KeyAction[]) => (e: KeyboardEvent) => {
  actions.forEach(({ key, action }) => {
    if (typeof key === "string") {
      return e.key === key && action?.(e);
    }

    if (
      e.key === key.key &&
      compareKeyAttribute(e.altKey, key.altKey) &&
      compareKeyAttribute(e.ctrlKey, key.ctrlKey) &&
      compareKeyAttribute(e.shiftKey, key.shiftKey)
    ) {
      return action?.(e);
    }
  });
};

export const useOnKeydown = (...actions: KeyAction[]) => {
  const currentActions = useActualRef(actions);

  useEffect(() => {
    const abortController = new AbortController();

    document.addEventListener(
      "keydown",
      (e: KeyboardEvent) => actionsHandler(currentActions.current)(e),
      {
        signal: abortController.signal,
      }
    );

    return () => abortController.abort();
  }, [currentActions]);
};
