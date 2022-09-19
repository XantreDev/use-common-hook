const is = Object.is;

export const shallowEqual = (a: unknown, b: unknown) => {
  if (is(a, b)) return true;
  if (!(a instanceof Object) || !(b instanceof Object)) return false;

  const keys = Object.keys(a) as (keyof typeof a)[];
  const length = keys.length;

  for (let i = 0; i < length; i++)
    if (!(keys[i] in b) || !is(a[keys[i]] as any, b[keys[i]])) return false;

  return length === Object.keys(b).length;
};
