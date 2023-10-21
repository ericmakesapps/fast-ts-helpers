import tuple from "./tuple"

/**
 * Sort the result of a promise based on an asynchronous property. The default sort is
 *   ascending.
 *
 * @param compareValue The value to sort on. If you need access to the original doc, return a tuple or something from here.
 * @param compareFn The sort function. Defaults to an ascending sort based on `>` and `<`.
 * @returns A promise that resolves to the sorted array.
 */
function sortAsync<T, U>(
	compareValue: (value: T) => U,
	compareFn: (a: Awaited<U>, b: Awaited<U>) => number = (l, r) =>
		l > r ? 1 : l < r ? -1 : 0
): (array: T[]) => Promise<T[]> {
	return async (array: T[]) => {
		const withSortValues = await Promise.all(
			array.map(async (value) => tuple(value, await compareValue(value)))
		)

		return withSortValues
			.sort(([, a], [, b]) => {
				return compareFn(a, b)
			})
			.map(([v]) => v)
	}
}

export default sortAsync
