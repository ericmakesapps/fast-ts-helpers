import { NestableList } from "./Types"

import { map } from "./map"
import { flat } from "./flat"

/**
 * Completely flatten a nestable array, then map it with a mapper function.
 *
 * @template Type The type of the elements in the array.
 * @template Result The type that results from the mapper.
 * @param array The array to completely flatten then map.
 * @param mapper The mapper function to use.
 * @returns A flattened version of the passed array with items mapped.
 */
export function flatmap<Type, Result>(
	array: NestableList<Type>,
	mapper: (item: Type, index: number) => Result
) {
	return map(flat(array), mapper)
}
