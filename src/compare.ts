/**
 * Do a comparison between two strings, ignoring case or letter variants and taking numbers into account.
 *
 * @param lhs The left-hand-side of the comparison.
 * @param rhs The right-hand-side of the comparison.
 * @returns A number representing the comparison between the strings.
 */
export function compare(lhs: string | undefined, rhs: string | undefined) {
	return (lhs ?? ``).localeCompare(rhs ?? ``, undefined, {
		numeric: true,
		sensitivity: `base`
	}) as -1 | 0 | 1
}
