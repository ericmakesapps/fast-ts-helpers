import NestableList from "./NestableList"

import map from "./map"
import flat from "./flat"

/**
 * Flatten the passed array, map it, then flatten the result such that the return is a flat array of the mapped type.
 *
 * @template Type The type of the elements in the array.
 * @template Result The type that results from the mapper.
 * @param array The array to completely flatten then map.
 * @param mapper The mapper function to use.
 * @returns A flattened version of the passed array with items mapped.
 */
function flatmap<Type, Result>(
	array: NestableList<Type>,
	mapper: (item: Type, index: number) => NestableList<Result>
): Result[] {
	return flat(map(flat(array), mapper))
}

export default flatmap
