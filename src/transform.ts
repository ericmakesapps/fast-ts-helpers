import { entries } from "./entries"

/**
 * Map an object's values to the result of a mapper function.
 *
 * @template Type The type of the object being mapped.
 * @template Result The type that results from the mapper.
 * @param obj The object to map.
 * @param mapper The mapper function to use.
 * @returns A version of the object with its values mapped.
 */
export function transform<Type extends object, Result>(
	obj: Type,
	mapper: (key: keyof Type, value: Type[typeof key]) => Result
): {
	[K in keyof Type]: Result
} {
	// eslint-disable-next-line
	return entries(obj).reduce<any>((trans, [prop, value]) => {
		trans[prop] = mapper(prop as keyof Type, value)

		// eslint-disable-next-line
		return trans
	}, {})
}
