/**
 * Create an enum-like object from the passed strings.
 *
 * @param keys The keys to include in this enumeration.
 * @returns An object representing an enumeration of the passed values.
 */

export function enumize<K extends string>(...keys: K[]) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const ret: any = {}

	keys.forEach((k) => (ret[k] = k))

	return ret as {
		readonly [P in K]: P
	}
}
