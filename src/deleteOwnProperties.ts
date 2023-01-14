import keys from "./keys"

/**
 * Delete all the entries in this object. **This mutates the object itself**!
 *
 * @template Type The type of the object being erased.
 * @param obj The object whose properties to delete.
 * @returns The same object, but without all of its own properties.
 */
function deleteOwnProperties<Type extends object>(obj: Type) {
	for (const key of keys(obj)) {
		delete obj[key as keyof Type]
	}

	return obj as {}
}

export default deleteOwnProperties
