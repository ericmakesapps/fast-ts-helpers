import stringify from "fast-json-stable-stringify"

import transform from "./transform"
import uuid from "./uuid"

/**
 * Make a stable cache key for a given object. That is to say, any equal object will return the same cache key.
 *
 * **Depends on `fast-json-stable-stringify`**.
 *
 * @param obj The object for which a cache key is wanted.
 * @template Type The type of the object passed in.
 * @returns The stable cache key for the passed object.
 */
function cacheKey<Type>(obj: Type) {
	return stringify(replace(obj))
}

function replace(value: any): any {
	// For plain javascript objects, recursively replace values.
	if (value && typeof value === "object") {
		// Arrays
		if (Array.isArray(value)) {
			return value.map(replace)
		}

		// Dates and Regular Expressions
		if (["Date", "RegExp"].includes(value.constructor.name)) {
			return value
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
		return `~.~${value?.toString()}~.~`
	}

	return value
}

export default cacheKey
