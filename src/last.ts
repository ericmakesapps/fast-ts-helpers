/**
 * Get the last item from an array without having to save a reference to it, or manually check its length.
 *
 * @param arr The array from which to get the last item.
 * @returns The last item from the passed array, if it exists.
 */
function last<T extends readonly unknown[]>(
	arr: T
): T extends readonly [...unknown[], infer Last] ? Last : T[number]
function last<T extends any[]>(arr: T | null | undefined): T[number] | undefined

function last(array: any[]) {
	return array?.[array.length - 1]
}

export default last
