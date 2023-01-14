import fullyMatches from "./fullyMatches"
import parseDate from "./parseDate"

/**
 * Inject actual Date objects in place of date strings and numbers in the passed object. **This mutates the passed in object**. If the value is a string, it matches the string against a regex for ISO date strings. If the value is a number, it matches the property name for the "date" in the name.
 *
 * @template Type The type of the object where dates are being injected.
 * @param obj The object in which to inject Dates for all date properties.
 * @returns The same object that was passed in.
 */
function injectDates<Type extends {}>(obj: Type) {
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			const value = obj[key]

			if (
				(typeof value === `string` &&
					fullyMatches(
						value,
						// Regex that matches any valid ISO date string. See the [format](https://www.w3.org/TR/NOTE-datetime).
						/\d{4}(-\d{2})?(-\d{2})?(T\d{2}(:\d{2}(:\d{2}(\.\d+)?)?)?([+-]\d+(:\d{2})?|Z)?)?|\d{2}:\d{2}(:\d{2}(\.\d+)?)?([+-]\d+(:\d{2})?|Z)?/
					)) ||
				(typeof value === `number` && /(^d|D)ate([A-Z0-9_]|$)/.test(key))
			) {
				obj[key] = parseDate(value) as unknown as typeof value
			} else if (value && typeof value === `object`) {
				obj[key] = injectDates(value)
			}
		}
	}

	return obj
}

export default injectDates
