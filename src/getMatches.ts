/**
 * Find all matches and groups of a given RegExp in the passed string.
 *
 * @param text The text to search.
 * @param regex The regular expression to use for matching.
 * @returns The matches of the regular expression in the string.
 */
export function getMatches(text: string, regex: RegExp) {
	function findMatches(str: string, pattern: RegExp, matches: RegExpMatchArray[] = []) {
		const match = pattern.exec(str)

		if (match) {
			matches.push(match)

			findMatches(str, pattern, matches)
		}

		return matches
	}

	return findMatches(text, new RegExp(regex.source, `${regex.flags}g`))
}
