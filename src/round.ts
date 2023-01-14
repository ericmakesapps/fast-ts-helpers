/**
 * Round the passed number (to the passed number of places if applicable).
 *
 * @param value The value to round.
 * @param places The number of places to which to round the number. Defaults to `0`.
 * @returns The rounded value.
 */
function round(value: number, places = 0): number {
	return places < 0
		? round(value / Math.pow(10, places)) * Math.pow(10, places)
		: Math.round(
				(value + (value >= 0 ? Number.EPSILON : -Number.EPSILON)) * Math.pow(10, places)
		  ) / Math.pow(10, places)
}

export default round
