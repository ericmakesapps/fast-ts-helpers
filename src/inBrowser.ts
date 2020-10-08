/**
 * Call a callback if we are in a browser environment.
 *
 * @param callback The callback to call if we are in the browser environment.
 */
export function inBrowser(callback: () => void) {
	if (
		Boolean(window) ||
		// @ts-expect-error
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(typeof process !== `undefined` && Boolean((process as any)?.browser))
	) {
		callback()
	}
}
