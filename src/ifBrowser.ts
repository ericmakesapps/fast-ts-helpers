/**
 * Run a function if run in the browser, or return a callback value.
 * @param cb The function to run if this is in the browser.
 * @param fallback The value to return if this is not in the browser.
 * @returns The value from the function if run in the browser, or the fallback value if not in the browser.
 */
const ifBrowser = <T extends any>(cb: () => T, fallback: T) => {
	if (typeof window !== "undefined" && typeof document !== "undefined") {
		return cb()
	}

	return fallback
}

export default ifBrowser
