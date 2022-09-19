import { useCallback, useState } from "react";

export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const setToggle = useCallback(
    (newState?: unknown) =>
      setState((currentState) =>
        typeof newState === "boolean" ? newState : !currentState
      ),
    []
  );

  return [state, setToggle] as const;
};
