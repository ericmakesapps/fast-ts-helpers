/**
 * Map an array in a promise.
 *
 * @param mapper The mapping function, which returns a promise that resolves to the result.
 * @returns A function that takes an array and returns a promise that resolves to the mapped array, to be passed to the `then` of the promise chain.
 */
function mapAsync<T, U>(
	mapper: (value: T, index: number, array: T[]) => U
): (array: T[]) => Promise<Awaited<U>[]> {
	return async (array: T[]) => Promise.all(array.map(mapper))
}

export default mapAsync
