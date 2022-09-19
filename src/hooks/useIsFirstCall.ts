import { useCallback, useRef } from "react";

export const useIsFirstCall = () => {
  const isFirstCallRef = useRef(true);

  return useCallback(() => {
    if (isFirstCallRef.current) {
      isFirstCallRef.current = false;

      return true;
    }

    return isFirstCallRef.current;
  }, []);
};
