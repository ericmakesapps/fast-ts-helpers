import NestableList from "./NestableList"
import wrap from "./wrap"

/**
 * Completely flatten a nestable array.
 *
 * @template Type The type of the elements in the array.
 * @param array The array to completely flatten.
 * @returns A flattened version of the passed array.
 */
function flat<Type>(array: NestableList<Type> extends any ? NestableList<Type> : never) {
	return wrap(array).flat(Infinity) as Type[]
}

export default flat
