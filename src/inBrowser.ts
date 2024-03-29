/**
 * Call a callback if we are in a browser environment.
 *
 * @param callback The callback to call if we are in the browser environment.
 */
function inBrowser(callback: () => void) {
	if (
		Boolean(window) ||
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(typeof process !== `undefined` && Boolean((process as any)?.browser))
	) {
		callback()
	}
}

export default inBrowser
