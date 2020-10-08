/**
 * Determine whether the user is currently using Internet Explorer.
 *
 * @returns Whether the user is using Internet Explorer.
 */
export function isIe() {
	return Boolean(/MSIE|Trident/i.test(navigator.userAgent))
}
