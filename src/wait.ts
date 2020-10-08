/**
 * Return a promise that resolves after the passed number of milliseconds.
 *
 * @param millis The number of milliseconds to wait before resolving.
 */
export async function wait(millis = 0) {
	return new Promise<void>((resolve) => setTimeout(resolve, millis))
}
