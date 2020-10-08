type BaseRangeParameters = {
	start?: number
	step?: number
}

export type UntilRangeParameters = {
	until: number
	through?: never
} & BaseRangeParameters

export type ThroughRangeParameters = {
	until?: never
	through: number
} & BaseRangeParameters

/**
 * Create a range of numbers for iterating through them.
 *
 * @param start The (inclusive) start of the range. Defaults to `0`.
 * @param until The (non-inclusive) end of the range.
 * @param step The step between each value. Defaults to `1` or `-1`.
 * @returns An array containing the specified range.
 */
export function range({ start, until, step }: UntilRangeParameters): number[]
/**
 * Create a range of numbers for iterating through them.
 *
 * @param start The (inclusive) start of the range. Defaults to `0`.
 * @param through The (inclusive) end of the range.
 * @param step The step between each value. Defaults to `1` or `-1`.
 * @returns An array containing the specified range.
 */
export function range({ start, through, step }: ThroughRangeParameters): number[]
/**
 * Create a range up to the passed number, stepping by `1` or `-1`.
 *
 * @param until The (non-inclusive) end of the range.
 * @returns An array containing the specified range.
 */
export function range(until: number): number[]
/**
 * Create a range of from the start (inclusively) to end (non-inclusively), stepping by `1` or `-1`.
 *
 * @param start The (inclusive) start of the range. Defaults to `0`.
 * @param until The (non-inclusive) end of the range.
 * @returns An array containing the specified range.
 */
export function range(start: number, until: number): number[]
/**
 * Create a range of numbers from start (inclusively) to end (non-inclusively) with the passed step.
 *
 * @param start The (inclusive) start of the range. Defaults to `0`.
 * @param until The (non-inclusive) end of the range.
 * @param step The step between each value. Defaults to `1` or `-1`.
 * @returns An array containing the specified range.
 */
export function range(start: number, until: number, step: number): number[]

export function range(
	start: number | UntilRangeParameters | ThroughRangeParameters,
	until?: number,
	step?: number
) {
	let isThrough = false

	if (typeof start === `object`) {
		const { through } = start as ThroughRangeParameters

		step = start.step
		until = start.until
		start = start.start ?? 0

		if (until == null) {
			isThrough = true
			until = through
		}
	} else if (until == null) {
		until = start
		start = 0
	}

	if (step == null) {
		if (start < until) {
			step = 1
		} else {
			step = -1
		}
	}

	if (isThrough) {
		until += step
	}

	if ((start < until && step < 0) || (start > until && step > 0)) {
		throw new Error(`Step cannot cause start to get further from end`)
	}

	const _start = start
	const _step = step

	return Array.from(
		{ length: Math.floor(Math.abs((until - start) / step)) },
		(_, i) => _start + _step * i
	)
}
