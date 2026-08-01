/**
 * Get the last item from an array without having to save a reference to it, or manually check its length.
 *
 * @param arr The array from which to get the last item.
 * @returns The last item from the passed array, if it exists.
 */
function last<T extends readonly [...unknown[], NonNullable<unknown>]>(
	arr: T
): T extends readonly [...unknown[], infer Last] ? Last : never
function last<T extends unknown[] | null | undefined>(
	arr: T | null | undefined
): T extends null | undefined ? undefined : NonNullable<T>[number] | undefined

function last(array: any[]) {
	return array?.[array.length - 1]
}

export default last
