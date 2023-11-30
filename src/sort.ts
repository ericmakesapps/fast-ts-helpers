import tuple from "./tuple"

/**
 * Sort an array based on a property. The default sort is ascending.
 *
 * @param compareValue The value to sort on. If you need access to the original doc in the compare function, return a tuple or something from here.
 * @param compareFn The sort function. Defaults to a locale compare using US locale for strings, and otherwise an ascending sort based on the greater than and less than operators.
 * @returns A copy of the array with the values sorted.
 */
function sort<T, U>(
	array: T[],
	compareValue: (value: T) => U,
	compareFn: (a: U, b: U) => number = (l, r) =>
		typeof l === "string" && typeof r === "string"
			? l.localeCompare(r, "en-US", { numeric: true, sensitivity: "base" })
			: l > r
			? 1
			: l < r
			? -1
			: 0
): T[] {
	return array
		.map((value) => tuple(value, compareValue(value)))
		.sort(([, a], [, b]) => compareFn(a, b))
		.map(([v]) => v)
}

export default sort
