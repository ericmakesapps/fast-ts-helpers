import NonFalsible from "./NonFalsible"

/**
 * Wait for the first truthy value from a list of promises, ignoring the others.
 *
 * @param promises The promises from which to wait for the first truthy value.
 * @param error The error to throw if nothing is found. Defaults to `new Error("None of the promises resolved to a truthy value")`. If null is explicitly passed, this will resolve to undefined instead (instead of throwing).
 * @param rethrow Whether to rethrow the first error that any inner promise throws (so you can catch it yourself), or ignore them. We ignore errors by default.
 * @returns A promise that resolves to the first truthy value from any of the passed promises, or rejects if none of the passed promises resolve to a truthy value.
 */
async function firstTruthy<T extends PromiseLike<any>>(
	promises: T[],
	error: null,
	rethrow?: boolean
): Promise<NonFalsible<Awaited<T>> | undefined>

async function firstTruthy<T extends PromiseLike<any>>(
	promises: T[],
	error?: object,
	rethrow?: boolean
): Promise<NonFalsible<Awaited<T>>>

async function firstTruthy<T extends PromiseLike<any>>(
	promises: T[],
	error: any = new Error("None of the promises resolved to a truthy value"),
	rethrow?: boolean
) {
	return new Promise<NonFalsible<Awaited<T>> | undefined>(async (resolve, reject) => {
		let resolved = false

		await Promise.all(
			promises.map((promise) =>
				promise.then(
					(value) => {
						if (value && !resolved) {
							resolved = true

							resolve(value)
						}
					},
					(err) => {
						if (rethrow && !resolved) {
							resolved = true

							reject(err)
						}
					}
				)
			)
		)

		if (!resolved) {
			if (error !== null) {
				reject(error)
			} else {
				resolve(undefined)
			}
		}
	})
}

export default firstTruthy
