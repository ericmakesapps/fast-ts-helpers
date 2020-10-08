/**
 * Returns whether the passed values are equal in value, i.e., a deep equals. It does not support circular objects right now, so don't pass one in.
 *
 * @param values The items to be compared.
 * @template Type The common type between all values.
 * @returns Whether all of the passed values are equal.
 */
export function areEqual<Type>(...values: Type[]) {
	// Iteratively compare each item to all the ones after it in the list. If any are unequal, return false. Don't need any smarts here, as JS is always single threaded right now.
	for (let i = 0; i < values.length - 1; i += 1) {
		for (let j = i + 1; j < values.length; j += 1) {
			if (!doEqual(values[i], values[j])) {
				return false
			}
		}
	}

	function doEqual<T>(a: T, b: T) {
		if (a === b) {
			return true
		}

		if (Boolean(a) !== Boolean(b) || typeof a !== typeof b) {
			return false
		}

		if (typeof a === `object`) {
			if (Array.isArray(a) !== Array.isArray(b)) {
				return false
			}

			// Prepare for deep comparison
			const keys = Object.keys(a)

			if (keys.length !== Object.keys(b).length) {
				return false
			}

			for (const key of keys) {
				if (!areEqual(a[key as keyof T], b[key as keyof T])) {
					return false
				}
			}

			return true
		}

		if (typeof a === `number` && isNaN(a) && isNaN((b as unknown) as number)) {
			// NaN === NaN for me. This is different from standard, so beware.
			return true
		}

		return false
	}

	return true
}
