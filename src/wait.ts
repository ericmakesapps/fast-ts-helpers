/**
 * Return a promise that resolves after the passed number of milliseconds.
 *
 * @param millis The number of milliseconds to wait before resolving.
 */
async function wait(millis = 0) {
	return new Promise<void>((resolve) => setTimeout(resolve, millis))
}

export default wait
