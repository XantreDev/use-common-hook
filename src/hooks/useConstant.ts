import { useState } from "react";

export const useConstant = <T>(initializer: () => T) =>
  useState(initializer)[0];
