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
      if (typeof valueOrCallback !== "function") {
        const newValue = valueOrCallback;
        ref.current = newValue;
        setState(newValue);

        return;
      }

      const newValue = (valueOrCallback as any)(ref.current);

      ref.current = newValue;
      setState(newValue);
    },
    []
  );

  const getter = useCallback(() => ref.current, []);

  return { state, setter, getter } as const;
};
