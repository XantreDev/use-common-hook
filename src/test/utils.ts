export const wait = (timeoutMs: number) =>
  new Promise<void>((resolve, reject) => {
    setTimeout(resolve, timeoutMs);
  });
