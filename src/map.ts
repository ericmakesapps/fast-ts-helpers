import { wrap } from "./wrap"

/**
 * Map a single item or an array of items to another type.
 *
 * @template Type The type of the elements in the array.
 * @template Result The type that results from the mapper.
 * @param array The array of items (or single item) to map.
 * @param mapper The mapper function.
 * @returns A version of the passed array with its values mapped.
 */
export function map<Type, Result>(
	array: Type | Type[],
	mapper: (item: Type, index: number) => Result
) {
	return wrap(array).map(mapper)
}
