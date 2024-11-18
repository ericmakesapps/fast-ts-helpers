/** Test whether a given string is JSON-like. This doesn't do any real validation. */
export default function isJsonlike(value: string) {
	return /^(\s\n)*(-?[0-9](_?[0-9])*(\.[0-9](_?[0-9])*)?|0x[0-9](_?[0-9])*|[0-9](_?[0-9])*e[0-9](_?[0-9])*|null|".*"|\{(.|\n)*\}|\[(.|\n)*\])(\s\n)*$/i.test(
		value
	)
}
