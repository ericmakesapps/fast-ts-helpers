/**
 * Get the last item from an array without having to save a reference to it, or manually check its length.
 *
 * @param array The array from which to get the last item.
 * @returns The last item from the passed array, if it exists.
 */
const last = <T>(array: T[] | null | undefined) => array?.[array.length - 1]

export default last
