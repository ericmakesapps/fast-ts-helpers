import as from "./as"
import every from "./every"

/**
 * Returns whether the passed values are equal in value, i.e., a deep equals. It does not support circular objects right now, so don't pass one in.
 *
 * **Notes**:
 *
 * - This doesn't traverse custom properties on dates or arrays.
 * - This treats `NaN`s as equal.
 *
 * @param values The items to be compared.
 * @template Type The common type between all values.
 * @returns Whether all of the passed values are equal.
 */
function areEqual(...values: any[]) {
	// Iteratively compare each item to all the ones after it in the list. If any are
	//   unequal, return false. Don't need any smarts here, as JS is single threaded.
	for (let i = 0; i < values.length - 1; i += 1) {
		for (let j = i + 1; j < values.length; j += 1) {
			if (!areEqual(values[i], values[j])) {
				return false
			}
		}
	}

	function areEqual(a: any, b: any): boolean {
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

			// If it's an array, let's iterate through the items therein. This will not
			//   take into account custom properties on the array, but that's okay.
			if (Array.isArray(a)) {
				as<any[]>(b)

				return a.length === b.length && a.every((v, i) => areEqual(v, b[i]))
			}

			// Check whether the two objects have the same constructor name. This doesn't
			//   mean they are the same type if they do, but they aren't if they don't.
			if (a.constructor.name !== b.constructor.name) {
				return false
			}

			// If they are both maps, compare their keys and values. This will not take
			//   into account custom properties on the map, but that's okay.
			if (a.constructor.name === "Map") {
				as<Map<any, any>>(a)
				as<Map<any, any>>(b)

				return a.size === b.size && every(a, (k, v) => areEqual(v, b.get(k)))
			}

			// If they are both sets, compare their values. This will not take into
			//   account custom properties on the set, but that's okay.
			if (a.constructor.name === "Set") {
				as<Set<any>>(a)
				as<Set<any>>(b)

				return a.size === b.size && every(a, (v) => b.has(v))
			}

			// If they're both dates, compare their times. This will not take into account
			//   custom properties on the date, but that's okay.
			if (
				a.constructor.name === "Date" &&
				typeof a.getTime === "function" &&
				typeof b.getTime === "function"
			) {
				as<Date>(a)
				as<Date>(b)

				return a.getTime() === b.getTime()
			}

			// If they're both regular expressions, compare their sources and flags. This
			//   will not take into account custom properties on the regex, but that's
			//   okay.
			if (a.constructor.name === "RegExp" && b.constructor.name === "RegExp") {
				as<RegExp>(a)
				as<RegExp>(b)

				return a.source === b.source && a.flags === b.flags
			}

			// Now that we've knocked out the usual suspects, lets just compare the keys
			//   and values.
			const aKeys = Object.keys(a)

			if (aKeys.length !== Object.keys(b).length) {
				return false
			}

			for (const key of aKeys) {
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
