import unique from "./unique"

/**
 * Returns an array of the unique elements that are present in both input arrays.
 *
 * @param a - The first input array.
 * @param b - The second input array.
 * @returns An array of elements that are present in both input arrays.
 * @template T - The type of the elements in the input arrays.
 */
function intersection<T>(a: T[], b: T[]): T[]

/**
 * Returns an array of the unique elements that are present in both input arrays,
 *   according to the passed comparator function, keeping the instance from the first
 *   array.
 *
 * @param a - The first input array.
 * @param b - The second input array.
 * @param comparator - A function that takes two elements and returns true if they are considered equal.
 * @returns An array of elements from `a` that were present in both input arrays.
 * @template T - The type of the elements in the input arrays.
 */
function intersection<T>(a: T[], b: T[], comparator: (a: T, b: T) => boolean): T[]

function intersection(a: any[], b: any[], comparator?: (a: any, b: any) => boolean) {
	if (comparator) {
		return unique(
			a.filter((x) => b.some((y) => comparator(x, y))),
			comparator
		)
	}

	const set = new Set(b)

	return unique(a.filter((x) => set.has(x)))
}

export default intersection
