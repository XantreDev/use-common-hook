import { useRef } from "react";

export const useConstant = <T>(initializer: () => Exclude<T, null>) => {
  const ref = useRef<T>(null);
  if (ref.current === null) {
    (ref.current as any) = initializer();
  }

  return ref.current as T extends null ? never : T;
};
