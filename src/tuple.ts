/** Get the passed in items as a tuple. */
export function tuple<T extends unknown[]>(...args: T): T {
	return args
}
