/**
 * Check in a functional manner whether every element in an array passes a predicate.
 *
 * @param array The array to check if every element passes the predicate.
 * @param predicate The predicate to use to check.
 * @returns Whether every element passes the predicate.
 * @template V The type of the values in the array.
 */
function every<V>(
	array: V[],
	predicate: (item: V, index: number, array: V[]) => boolean
): boolean
/**
 * Check whether every element in a set passes a predicate.
 *
 * @param set The set to check if every element passes the predicate.
 * @param predicate The predicate to use to check.
 * @returns Whether every element passes the predicate.
 * @template V The type of the values in the set.
 */
function every<V>(set: Set<V>, predicate: (item: V, set: Set<V>) => boolean): boolean
/**
 * Check whether every element in a map passes a predicate.
 *
 * @param map The map to check if every element passes the predicate.
 * @param predicate The predicate to use to check.
 * @returns Whether every element passes the predicate.
 * @template K The type of the keys in the map.
 * @template V The type of the values in the map.
 */
function every<K, V>(
	map: Map<K, V>,
	predicate: (key: K, value: V, map: Map<K, V>) => boolean
): boolean

function every(
	collection: any[] | Set<any> | Map<any, any>,
	predicate: (itemOrKey: any, indexOrValueOrCollection: any, collection?: any) => boolean
): boolean {
	if (Array.isArray(collection)) {
		return collection.every(predicate)
	}

	if (collection.constructor.name === "Set") {
		for (const item of collection.values()) {
			if (!predicate(item, collection)) {
				return false
			}
		}

		return true
	}

	if (collection.constructor.name === "Map") {
		for (const [key, value] of collection.entries()) {
			if (!predicate(key, value, collection)) {
				return false
			}
		}

		return true
	}

	return false
}

export default every
