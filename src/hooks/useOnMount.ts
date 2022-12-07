import { useIsFirstCall } from "./useIsFirstCall";

export const useOnMount = (effect: () => any) => {
  useIsFirstCall()() && effect();
};
