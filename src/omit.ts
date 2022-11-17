/**
 * Return a version of the passed object which excludes the properties with the passed keys.
 *
 * @template Type The type of object from which properties are being omitted.
 * @template Key The keys that should be omitted.
 * @param obj The object from which to omit values.
 * @param keys The keys whose values to omit.
 * @returns A version of the object without the specified keys.
 */
export function omit<Type extends object, Key extends keyof Type>(
	obj: Type,
	...keys: Key[]
): Omit<Type, Key>

/**
 * Return a version of the passed object which excludes the properties with keys that match the passed RegExp.
 *
 * @template Type The type of object from which properties are being omitted.
 * @param obj The object from which to omit the values whose keys match the pattern.
 * @param pattern The pattern against which to test keys for those whose values to omit.
 * @returns A version of the object without the keys that match RegExp.
 */
export function omit<Type extends object>(obj: Type, pattern: RegExp): Partial<Type>

export function omit<T extends object, K extends keyof T>(
	obj: T,
	patternOrKey: K | RegExp,
	...keys: K[]
) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const ret: any = {}

	if (patternOrKey instanceof RegExp) {
		Object.keys(obj).forEach((k) => {
			if (!patternOrKey.test(k)) {
				ret[k] = obj[k as K]
			}
		})
	} else {
		Object.keys(obj).forEach((k) => {
			if (k !== String(patternOrKey) && !keys.includes(`${k}` as K)) {
				ret[k] = obj[k as K]
			}
		})
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return ret
}
