/**
 * Return the passed array, or wrap the item in an array.
 *
 * @template Type The type of the elements in the array.
 * @param array The arary or item to wrap in an array.
 * @returns The passed item itself if it already was an array, or the item wrapped in an array.
 */
function wrap<Type>(array: Type | Type[]): Type[] {
	return Array.isArray(array) ? array : [array]
}

export default wrap
