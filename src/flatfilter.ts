import { NestableList } from "./Types"
import { filter } from "./filter"
import { flat } from "./flat"

/**
 * Completely flatten a nestable array, then filter out falsey values.
 *
 * @template Type The type of the elements in the array.
 * @param array The array to completely flatten, then from which to filter out falsey values.
 * @returns A flattened version of the passed array with falsible items filtered out.
 */
export function flatfilter<Type>(array: NestableList<Type>) {
	return filter(flat(array))
}
