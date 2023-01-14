/**
 * Determine whether the user is currently using Internet Explorer.
 *
 * @returns Whether the user is using Internet Explorer.
 */
function isIE() {
	return Boolean(/MSIE|Trident/i.test(navigator.userAgent))
}

export default isIE
