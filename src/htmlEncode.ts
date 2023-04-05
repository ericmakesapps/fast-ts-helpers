/**
 * Encode a string for displaying in HTML with the HTML Name codes as seen in the [HTML Codes Table](https://ascii.cl/htmlcodes.htm). Only `&`, `'`, `"`, `>`, and `<` are encoded.
 * @param str The string to encode with the appropriate HTML Name codes.
 */
function htmlEncode(str: string): string
function htmlEncode(str: string | undefined): string | undefined
function htmlEncode(str: string | undefined) {
	return str
		?.replace(/&/g, "&amp;")
		.replace(/'/g, "&#39;")
		.replace(/"/g, "&quot;")
		.replace(/>/g, "&gt;")
		.replace(/</g, "&lt;")
}

export default htmlEncode
