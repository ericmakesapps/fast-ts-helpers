/**
 * Test whether the entirety of the given string matches the regex. You can pass flags and everything like normal.
 *
 * @param str The string to test.
 * @param regex The regex to use to match. You can pass flags like normal here.
 * @param treatUndefinedAsEmptyString Whether `undefined` for the string should be treated the same as empty string.
 * @returns Whether the string fully matches the regular expression.
 */
export function fullyMatches(
	str: string | undefined | null,
	regex: string | RegExp,
	treatUndefinedAsEmptyString = false
) {
	if (str == null) {
		if (treatUndefinedAsEmptyString) {
			str = ``
		} else {
			return false
		}
	}

	const flags = typeof regex === `string` ? `` : regex.flags
	const text = typeof regex === `string` ? regex : regex.source

	return new RegExp(`^(${text})$`, flags).test(str)
}
