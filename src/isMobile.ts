import checkBounds, { Orientation } from "./checkBounds"
import mobileBreakpoint from "./mobileBreakpoint"

/**
 * Check whether the screen is currently at a mobile viewport size.
 *
 * @param orientation The orientation to use while checking.
 * @returns Whether the viewport is currently mobile.
 */
function isMobile(orientation?: Orientation) {
	return checkBounds(window.innerWidth, [0, mobileBreakpoint], orientation)
}

export default isMobile
