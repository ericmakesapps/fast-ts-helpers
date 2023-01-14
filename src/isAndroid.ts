/**
 * Determine whether the user is currently on an Android device.
 *
 * @returns Whether the user is on an Android device.
 */
function isAndroid() {
	return /Android/i.test(navigator.userAgent)
}

export default isAndroid
