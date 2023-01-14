/**
 * Throttle the passed function. This means that the function will only fire once per threshold amount of time.
 *
 * @param func The function to be throttled.
 * @param threshold How long to wait before allowing the function to be triggered again. Default is `100`.
 * @returns A version of this function that will only trigger once per threshold amount of time.
 */
function throttle<T extends (...args: any[]) => void>(func: T, threshold = 100) {
	let suppress = false
	let delay: (() => void) | undefined

	function clear() {
		suppress = false

		if (delay) {
			delay()
			delay = undefined
		}
	}

	return function (this: T, ...args: unknown[]) {
		if (!suppress) {
			func.apply(this, args)
			setTimeout(clear, threshold)
			suppress = true
		} else {
			delay = func.bind(this, ...args)
		}
	} as T
}

export default throttle
