/**
 * Get whether a thing is callable.
 *
 * @param thing The thing that is potentially callable.
 */
export function isCallable(thing: unknown): thing is CallableFunction {
	return typeof thing === `function`
}
