/**
 * Return a version of the passed object which excludes the properties with the passed keys.
 *
 * @template Type The type of object from which properties are being omitted.
 * @template Key The keys that should be omitted.
 * @param obj The object from which to omit values.
 * @param keys The keys whose values to omit.
 * @returns A version of the object without the specified keys.
 */
function omit<Type extends object, Key extends keyof Type>(
	obj: Type,
	keys: Key[]
): Omit<Type, Key>

/**
 * Return a version of the passed object which excludes the properties with the passed keys.
 *
 * @template Type The type of object from which properties are being omitted.
 * @template Key The keys that should be omitted.
 * @param obj The object from which to omit values.
 * @param keys The keys whose values to omit.
 * @returns A version of the object without the specified keys.
 */
function omit<Type extends object, Key extends keyof Type>(
	obj: Type | undefined,
	keys: Key[]
): Omit<Type, Key> | undefined

/**
 * Return a version of the passed object which excludes the properties with keys that match the passed RegExp.
 *
 * @template Type The type of object from which properties are being omitted.
 * @param obj The object from which to omit the values whose keys match the pattern.
 * @param pattern The pattern against which to test keys for those whose values to omit.
 * @returns A version of the object without the keys that match RegExp.
 */
function omit<Type extends object>(obj: Type, pattern: RegExp): Partial<Type>

/**
 * Return a version of the passed object which excludes the properties with keys that match the passed RegExp.
 *
 * @template Type The type of object from which properties are being omitted.
 * @param obj The object from which to omit the values whose keys match the pattern.
 * @param pattern The pattern against which to test keys for those whose values to omit.
 * @returns A version of the object without the keys that match RegExp.
 */
function omit<Type extends object>(
	obj: Type | undefined,
	pattern: RegExp
): Partial<Type> | undefined

function omit<T extends object, K extends keyof T>(
	obj: T | undefined,
	patternOrKeys: RegExp | K[]
) {
	if (!obj) {
		return obj
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const ret: any = {}

	if (patternOrKeys instanceof RegExp) {
		for (const k of Object.keys(obj)) {
			if (!patternOrKeys.test(k)) {
				ret[k] = obj[k as K]
			}
		}
	} else {
		for (const k of Object.keys(obj)) {
			if (!patternOrKeys.includes(k as K)) {
				ret[k] = obj[k as K]
			}
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return ret
}

export default omit
