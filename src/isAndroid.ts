/**
 * Determine whether the user is currently on an Android device.
 *
 * @returns Whether the user is on an Android device.
 */
export function isAndroid() {
	return /Android/i.test(navigator.userAgent)
}
