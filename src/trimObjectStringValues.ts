/**
 * Mutate an object in place by trimming whitespace from all string values (including in descendants) using the built-in `string.trim()`.
 *
 * @param obj The object to mutate.
 * @returns The same object, with all of properties and descendants properties with string values trimmed.
 */
function trimObjectStringValues<T extends Record<string, any>>(obj: T): T {
	for (const key in obj) {
		if (typeof obj[key] === "string") {
			obj[key] = obj[key].trim()
		} else if (typeof obj[key] === "object") {
			obj[key] = trimObjectStringValues(obj[key])
		}
	}

	return obj
}

export default trimObjectStringValues
