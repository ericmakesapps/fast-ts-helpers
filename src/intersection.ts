import unique from "./unique"

/**
 * Returns an array of the unique elements that are present in both input arrays.
 *
 * @param a - The first input array.
 * @param b - The second input array.
 * @returns An array of elements that are present in both input arrays.
 * @template T - The type of the elements in the input arrays.
 */
const intersection = <T>(a: T[], b: T[]): T[] => {
	const set = new Set(a)

	return unique(b.filter((x) => set.has(x)))
}

export default intersection
