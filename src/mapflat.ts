import NestableList from "./NestableList"

import map from "./map"
import flat from "./flat"

/**
 * Map the flattened version of a nestable array. This won't flatten what the mapper returns—use flatmap if you want that.
 *
 * @template Type The type of the elements in the array.
 * @template Result The type that results from the mapper.
 * @param array The array to completely flatten then map.
 * @param mapper The mapper function to use.
 * @returns The items mapped from the flattened version of the passed array.
 */
function mapflat<Type, Result>(
	array: NestableList<Type>,
	mapper: (item: Type, index: number) => Result
) {
	return map(flat(array), mapper)
}

export default mapflat
