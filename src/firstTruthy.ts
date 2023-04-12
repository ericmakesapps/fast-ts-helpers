import NonFalsible from "./NonFalsible"

/**
 * Wait for the first truthy value from a list of promises, ignoring the others.
 *
 * @param promises The promises from which to wait for the first truthy value.
 * @returns A promise that resolves to the first truthy value from any of the passed promises, or rejects if none of the passed promises resolve to a truthy value.
 */
async function firstTruthy<T extends Promise<any>>(promises: T[]) {
	// Let's create this here so we have the correct stack trace
	const error = new Error("None of the promises resolved to a truthy value")

	return new Promise<NonFalsible<Awaited<T>>>(async (resolve, reject) => {
		let resolved = false

		await Promise.all(
			promises.map((promise) =>
				promise.then((value) => {
					if (value && !resolved) {
						resolved = true

						resolve(value)
					}
				})
			)
		)

		if (!resolved) {
			reject(error)
		}
	})
}

export default firstTruthy
