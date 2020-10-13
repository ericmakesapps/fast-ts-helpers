import { NonFalsible } from "./NonFalsible"

import { wrap } from "./wrap"

/**
 * Filter out all falsy values from the passed array.
 *
 * @template Type The type of the elements in the array.
 * @param array The array (or single item) to filter.
 * @returns A version of the passed array with falsible items filtered out.
 */
export function filter<Type>(array: Type | Type[]) {
	return wrap(array).filter(Boolean) as NonFalsible<Type>[]
}
