/**
 * Returns whether the passed values are equal in value, i.e., a deep equals. It does not support circular objects right now, so don't pass one in.
 *
 * **Note**: this treats `NaN`s as equal.
 *
 * @param values The items to be compared.
 * @template Type The common type between all values.
 * @returns Whether all of the passed values are equal.
 */
function areEqual(...values: any[]) {
	// Iteratively compare each item to all the ones after it in the list. If any are unequal, return false. Don't need any smarts here, as JS is always single threaded right now.
	for (let i = 0; i < values.length - 1; i += 1) {
		for (let j = i + 1; j < values.length; j += 1) {
			if (!doEqual(values[i], values[j])) {
				return false
			}
		}
	}

	function doEqual(a: any, b: any) {
		// Return true if they are equal via simple equality
		if (a === b) {
			return true
		}

		// Return false if their truthiness isn't equal
		if (Boolean(a) !== Boolean(b)) {
			return false
		}

		// Return false if they don't have the same type
		if (typeof a !== typeof b) {
			return false
		}

		// If a is truthy and and object, that means b is also truthy and also an object
		if (a && typeof a === `object`) {
			// Return false if one is an array but the other isn't
			if (Array.isArray(a) !== Array.isArray(b)) {
				return false
			}

			// Let's compare key by key now
			const keys = Object.keys(a)

			if (keys.length !== Object.keys(b).length) {
				return false
			}

			for (const key of keys) {
				if (!areEqual(a[key], b[key])) {
					return false
				}
			}

			return true
		}

		if (typeof a === `number` && isNaN(a) && isNaN(b)) {
			// NaN === NaN for me. This is different from standard, so beware.
			return true
		}

		return false
	}

	return true
}

export default areEqual
