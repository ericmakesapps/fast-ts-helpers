import parseDate from "./parseDate"

/**
 * Inject actual Date objects in place of date strings and numbers in the passed object. **This mutates the passed in object**. If the value is a string, it matches the string against a regex for ISO date strings. If the value is a number, it matches the property name for the "date" in the name.
 *
 * @template Type The type of the object where dates are being injected.
 * @param obj The object in which to inject Dates for all date properties.
 * @param omit A function that determines whether any given property and value should be Datified.
 * @returns The same object that was passed in.
 */
function injectDates<Type extends {}>(
	obj: Type,
	omit?: (key: string, value: any) => boolean
) {
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			const value = obj[key]

			if (
				(typeof value === `string` &&
					// Only match full date strings, not partials.

					value.match(
						/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?$/
					)) ||
				(typeof value === `number` && /(^d|D)ate([A-Z0-9_]|$)/.test(key))
			) {
				if (omit?.(key, value)) {
					continue
				}

				obj[key] = parseDate(value) as unknown as typeof value
			} else if (value && typeof value === `object`) {
				obj[key] = injectDates(value, omit)
			}
		}
	}

	return obj
}

export default injectDates
