/** A shorthand type for a function that takes certain args and returns something. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Func<Args extends any[] = any[], Ret = any> = (...args: Args) => Ret
