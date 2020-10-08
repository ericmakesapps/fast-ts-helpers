/**
 * Escape a string for regular expression. Any special chars in the string will be escaped.
 *
 * @param str The string to escape for regular expression.
 * @returns The escaped string.
 */
export function escape(str: string) {
	return str.replace(/[.*+\-?^${}()|[\]\\]/g, `\\$&`)
}
