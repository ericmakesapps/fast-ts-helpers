/**
 * Debounce the passed function. This means that the function will only fire once while it is being called within the threshold.
 *
 * @param func The function to be debounced.
 * @param threshold How long to wait before allowing the function to be triggered again. Default is `100`.
 * @param immediate Whether to trigger the function at the start instead of after the threshold. Default is `false`.
 * @returns A version of this function that will only trigger when it isn't called for the threshold amount of time.
 */
export function debounce<T extends (...args: any[]) => void>(
	func: T,
	threshold = 100,
	immediate = false
) {
	let timeout: number | undefined

	return function (this: T, ...args: unknown[]) {
		const call = () => {
			timeout = undefined

			if (!immediate) {
				func.apply(this, args)
			}
		}

		if (immediate && timeout == null) {
			func.apply(this, args)
		}

		clearTimeout(timeout)
		timeout = setTimeout(call, threshold)
	} as T
}
