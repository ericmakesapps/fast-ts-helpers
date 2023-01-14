import Func from "./Func"
import Falsible from "./Falsible"

import flatfilter from "./flatfilter"
import memoize from "./memoize"

const doCombine = memoize(<T extends Func>(...callbacks: T[]): T => {
	// @ts-expect-error
	return (...args) => {
		let last: ReturnType<T>

		for (const callback of callbacks) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			last = callback(...args)
		}

		// @ts-expect-error
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return last
	}
})

/**
 * Combine multiple callbacks into a single callback. Useful when you need to reuse some callback in multiple places, but also triggering different additional callbacks.
 *
 * @template Args The types of the arguments of the functions being passed in.
 * @param callbacks The rest parameter optional list of callbacks to use.
 * @returns The combined callback, or undefined if there were no callbacks passed in.
 */
function combine<Args extends unknown[]>(
	...callbacks: Falsible<(...args: Args) => void>[]
): ((...arg: Args) => void) | undefined {
	const filtered = flatfilter(callbacks)

	return filtered.length > 0 ? doCombine(...filtered) : undefined
}

export default combine
