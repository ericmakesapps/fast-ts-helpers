/**
 * Determine whether the user is currently on an iOS device.
 *
 * @returns Whether the user is on an iOS device.
 */
function isIOS() {
	return /iPad|iPhone|iPod/i.test(navigator.userAgent)
}

export default isIOS
