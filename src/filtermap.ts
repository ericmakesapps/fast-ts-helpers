import filter from "./filter"
import map from "./map"

/**
 * Map an array, then filter out falsey values.
 *
 * @template Type The type of the elements in the array.
 * @template Result The type that results from the mapper.
 * @param array The array to map with the passed mapper, then from which to filter out falsey values.
 * @param mapper The mapper function to use.
 * @returns A version of the passed array with its items mapped and falsible items filtered out.
 */
function filtermap<Type, Result>(
	array: Type | Type[],
	mapper: (item: Type, index: number) => Result
) {
	return filter(map(array, mapper))
}

export default filtermap
