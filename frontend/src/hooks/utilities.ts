export type Action<
  AC extends Record<string, (...args: any) => any>
> = ReturnType<AC[keyof AC]>;
