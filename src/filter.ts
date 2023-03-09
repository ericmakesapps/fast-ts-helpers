import Falsible from "./Falsible"
import wrap from "./wrap"

/**
 * Filter out all falsey values from the passed array.
 *
 * @template Type The type of the elements in the array.
 * @param array The array (or single item) to filter.
 * @returns A version of the passed array with falsible items filtered out.
 */
function filter<Type>(array: Falsible<Type> | Falsible<Type>[]) {
	return wrap(array).filter(Boolean) as Type[]
}

export default filter
