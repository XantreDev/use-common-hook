const is = Object.is;
const getKeys = Object.keys as <T>(
  value: T
) => (keyof T extends never ? string : keyof T)[];

export const shallowEqual = (a: unknown, b: unknown) => {
  if (is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || !a || !b) return false;

  const keys = getKeys(a);
  const length = keys.length;

  for (let i = 0; i < length; i++)
    if (!(keys[i] in b) || !is((a as any)[keys[i]], (b as any)[keys[i]]))
      return false;

  return length === Object.keys(b).length;
};
