import { useCallback, useRef, useState } from "react";

export type UseStateWithGetterResult<T> = {
  state: T;
  getter: () => T;
  setter: (changer: T | ((currentState: T) => T)) => void;
};

export const useStateWithGetter = <T>(initial: T | (() => T)) => {
  const [state, setState] = useState(initial);

  const ref = useRef(state);

  const setter = useCallback(
    (valueOrCallback: T | ((previousValue: T) => T)) => {
      const newValue =
        typeof valueOrCallback !== "function"
          ? valueOrCallback
          : (valueOrCallback as any)(ref.current);

      ref.current = newValue;
      setState(newValue);
    },
    []
  );

  const getter = useCallback(() => ref.current, []);

  return { state, setter, getter } as const;
};
