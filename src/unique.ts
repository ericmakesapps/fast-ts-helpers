/**
 * Remove duplicates from an array, optionally using the passed comparator. If no
 *   comparator is passed, the array is converted to a Set and back to an array to remove
 *   duplicates.
 *
 * @param array The array to remove duplicates from
 * @param comparator An optional comparator function. Should return whether a is equal to b.
 * @returns A copy of the passed array with the duplicates removed.
 */
function unique<T>(array: T[], comparator?: (a: T, b: T) => boolean): T[] {
	return comparator
		? array.reduce<T[]>((array, b) => {
				if (!array.some((a) => comparator(a, b))) {
					array.push(b)
				}

				return array
			}, [])
		: Array.from(new Set(array))
}

export default unique
