import every from "./every"

/**
 * Check in a functional manner whether an array has any elements that pass a predicate.
 *
 * @param array The array to check if some elements pass the predicate.
 * @param predicate The predicate to use to check.
 * @returns Whether any element passes the predicate.
 * @template V The type of the values in the array.
 */
function some<V>(
	array: V[],
	predicate: (item: V, index: number, array: V[]) => boolean
): boolean
/**
 * Check whether a set has any elements that pass a predicate.
 *
 * @param set The set to check if some elements pass the predicate.
 * @param predicate The predicate to use to check.
 * @returns Whether any element passes the predicate.
 * @template V The type of the values in the set.
 */
function some<V>(set: Set<V>, predicate: (item: V, set: Set<V>) => boolean): boolean
/**
 * Check whether a map has any elements that pass a predicate.
 *
 * @param map The map to check if some elements pass the predicate.
 * @param predicate The predicate to use to check.
 * @returns Whether any element passes the predicate.
 * @template K The type of the keys in the map.
 * @template V The type of the values in the map.
 */
function some<K, V>(
	map: Map<K, V>,
	predicate: (key: K, value: V, map: Map<K, V>) => boolean
): boolean

function some(
	collection: any[] | Set<any> | Map<any, any>,
	predicate: (itemOrKey: any, indexOrValueOrCollection: any, collection?: any) => boolean
): boolean {
	if (
		!Array.isArray(collection) &&
		collection.constructor.name !== "Set" &&
		collection.constructor.name !== "Map"
	) {
		return false
	}

	// If not every element fails the predicate, then some pass and this is true.
	return !every(collection as any, (...params) => !predicate(...params))
}

export default some
