import NestableList from "./NestableList"
import flat from "./flat"
import filtermap from "./filtermap"

/**
 * Completely flatten an array, map with the passed mapper, then filter out falsey values.
 *
 * @template Type The type of the elements in the array.
 * @template Result The type that results from the mapper.
 * @param array The array to completely flatten, map with the passed mapper, then from which to filter out falsey values.
 * @param mapper The mapper function to use.
 * @returns A flattened version of the passed array with its items mapped and falsible items filtered out.
 */
function flatfiltermap<Type, Result>(
	array: NestableList<Type>,
	mapper: (item: Type, index: number) => Result
) {
	return filtermap(flat(array), mapper)
}

export default flatfiltermap
