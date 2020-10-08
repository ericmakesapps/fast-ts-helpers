/**
 * Get whether a thing is callable.
 *
 * @param thing The thing that is potentially callable.
 */
export function isCallable<T>(thing: T): thing is T & CallableFunction {
	return typeof thing === `function`
}
