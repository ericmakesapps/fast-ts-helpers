/**
 * Returns `true` if the string returned by calling `toString` on `searchThing` appears as a substring of the result of calling `toString` on `thing`, at one or more positions that are greater than or equal to position; otherwise, returns false.
 *
 * @param thing The item to check whether it’s stringified version includes the stringified version of something.
 * @param searchThing The thing to stringify and check if it is in the passed item.
 * @param position If position is `undefined`, `0` is assumed, so as to search all of the string returned by calling `toString` on the passed item.
 */
const strIncludes = (
	thing: { toString(): string },
	searchThing: { toString(): string } | null | undefined,
	position?: number
) => searchThing != null && thing.toString().includes(searchThing.toString(), position)

export default strIncludes
