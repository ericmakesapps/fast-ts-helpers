import { escapeForRegex } from "./escapeForRegex"

type Group = {
	[key: string]: Group
}

/**
 * Compile a list of options into a regex string that will match any of them.
 *
 * @param options The options that should be matchable.
 */
export function compile(options: string[]) {
	const groups: Group = {}

	const put = (key: string, group: Group) => {
		const letter = key.charAt(0)
		const subgroup = letter in group ? group[letter] : (group[letter] = {})

		if (key.length > 0) {
			put(key.slice(1), subgroup)
		}
	}

	const flatten = (group: Group) => {
		const entries = Object.entries(group)
		const count = entries.length

		let regex = count > 1 ? `(?:` : ``
		let includeEmpty = false

		for (const [index, [key, subgroup]] of entries.entries()) {
			regex += escapeForRegex(key)

			const hasChildren = Object.keys(subgroup).length > 0

			if (hasChildren) {
				regex += flatten(subgroup)
			}

			if (key === ``) {
				includeEmpty = true
			} else {
				if (index < count - 1) {
					regex += `|`
				}
			}
		}

		if (count > 1) {
			regex += `)`

			if (includeEmpty) {
				regex += `?`
			}
		}

		return regex
	}

	for (const option of options) {
		put(option, groups)
	}

	const flat = flatten(groups)

	return flat
}
