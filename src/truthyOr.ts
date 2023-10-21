import Falsible from "./Falsible"

/**
 * Guarantee that a promise resolves to a truthy value, throwing a custom error if not.
 * @param error The error to throw if the promise doesn't resolve to a truthy value.
 * @returns A resolver that guarantees a truthy value, or throws the passed error.
 */
const truthyOr = (error: any) => {
	return <T>(obj: Falsible<T>) => {
		if (obj) {
			return obj as T
		}

		throw error
	}
}

export default truthyOr
