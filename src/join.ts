import { FalsibleList } from "./FalsibleList"
import { flatfilter } from "./flatfilter"

export type JoinOptions = {
	separator?: string
}

/**
 * Automatically resolve a nested optional array of strings into a single string using the passed separator. If using all literal strings, just use a literal class (it will save cycles).
 *
 * @param options The options containing the separator to use.
 * @param potentials The potential classes.
 * @returns The joined string of all the items.
 */
export function join(options: JoinOptions, ...potentials: FalsibleList<string>[]): string
/**
 * Automatically resolve a nested optional array of strings into a single space separated string. If using all literal strings, just use a literal class (it will save cycles).
 *
 * @param potentials The potential classes.
 * @returns The joined string of all the items.
 */
export function join(...potentials: FalsibleList<string>[]): string

export function join(
	options: JoinOptions | FalsibleList<string>,
	...potentials: FalsibleList<string>[]
): string {
	const optionsWerePassed = Boolean(
		Boolean(options) && typeof options === `object` && !Array.isArray(options)
	)

	const { separator = ` ` } = (optionsWerePassed ? options : {}) as JoinOptions

	if (!optionsWerePassed) {
		potentials.unshift(options as FalsibleList<string>)
	}

	const values = flatfilter(potentials)

	return values.length > 0 ? values.reduce((trans, next) => trans + separator + next) : ``
}
