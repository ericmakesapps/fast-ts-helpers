/**
 * Debounce the passed function. This means that the function will only fire once while it is being called within the threshold.
 *
 * @param func The function to be debounced. The return value will only be passed through if immediate is true.
 * @param threshold How long to wait before allowing the function to be triggered again. Default is `100`.
 * @param immediate Whether to trigger the function at the start instead of after the threshold. Default is `false`.
 * @returns A version of this function that will only trigger when it isn't called for the threshold amount of time.
 */
function debounce<T extends (...args: any[]) => unknown>(
	func: T,
	threshold?: number | undefined,
	immediate?: false | undefined,
	withLatestResult?: ((result: ReturnType<T>) => void) | undefined
): (...args: Parameters<T>) => void
function debounce<T extends (...args: any[]) => unknown>(
	func: T,
	threshold: number | undefined,
	immediate: true
): T

function debounce<T extends (...args: any[]) => unknown>(
	func: T,
	threshold = 100,
	immediate = false,
	withLatestResult?: (result: ReturnType<T>) => void
) {
	let timeout: number | undefined
	let returnVal: unknown

	return function (this: T, ...args: unknown[]) {
		const call = () => {
			timeout = undefined

			if (!immediate) {
				const result = func.apply(this, args)

				withLatestResult?.(result as ReturnType<T>)
			}
		}

		if (immediate && timeout == null) {
			returnVal = func.apply(this, args)
		}

		clearTimeout(timeout)
		timeout = setTimeout(call, threshold)

		if (immediate) {
			return returnVal
		}

		return undefined
	} as T
}

export default debounce
