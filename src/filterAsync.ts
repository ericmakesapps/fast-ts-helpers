/**
 * Asynchronously filters an array based on a given predicate function.
 * @param predicate - A function that tests each element of the array. Returns `true` to keep the element, `false` otherwise.
 * @returns A function to pass to `then` of the promise resolving to an array, which will return a promise that resolves to the filtered array.
 */
function filterAsync<T>(
	predicate: (value: T, index: number, array: T[]) => any
): (array: T[]) => Promise<T[]> {
	return async (array: T[]) =>
		Promise.all(
			array.map(async (value, index, array) =>
				(await predicate(value, index, array)) ? [value] : []
			)
		).then((arrays) => arrays.flat(1))
}

export default filterAsync
