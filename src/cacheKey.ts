import stringify from "fast-json-stable-stringify"

import transform from "./transform"
import uuid from "./uuid"

/**
 * Make a stable cache key for any given values. That is to say, any equal values will return the same cache key.
 *
 * **Depends on `fast-json-stable-stringify`**.
 *
 * @param values The values for which a cache key is wanted.
 * @returns The stable cache key for the passed values.
 */
function cacheKey(...values: any[]) {
	return stringify(values.map(replace))
}

function replace(value: any): any {
	// For plain javascript objects, recursively replace values.
	if (value && typeof value === "object") {
		// Arrays
		if (Array.isArray(value)) {
			return value.map(replace)
		}

		// Dates
		if (value.constructor.name === "Date") {
			return value
		}

		// Regular expressions
		if (value.constructor.name === "RegExp") {
			return { "\u180Eregexp": value.toString() }
		}

		// Errors
		if (value instanceof Error) {
			return [value.name, value.message]
		}

		// Objects, including plain objects and custom classes
		return transform(value, (_, value) => replace(value))
	}

	if (typeof value !== `object` && stringify([value]) === `[null]`) {
		if (typeof value === `function`) {
			// Let's still add a tag to functions, because we can't really check functions for equality
			if (`__cacheKey` in value) {
				return value.__cacheKey
			}

			const key = uuid()

			Object.defineProperty(value, `__cacheKey`, {
				value: key
			})

			return key
		}

		// Let's make sure others are treated differently from null
		return `\u180E${value?.toString()}`
	}

	return value
}

export default cacheKey
