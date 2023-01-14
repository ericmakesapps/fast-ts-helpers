import mobileBreakpoint from "./mobileBreakpoint"
import tabletBreakpoint from "./tabletBreakpoint"
import checkBounds, { Orientation } from "./checkBounds"

/**
 * Check whether the screen is currently at a tablet viewport size.
 *
 * @param orientation The orientation to use while checking.
 * @returns Whether the viewport is currently tablet.
 */
function isTablet(orientation?: Orientation) {
	return checkBounds(
		window.innerWidth,
		[mobileBreakpoint + 1, tabletBreakpoint],
		orientation
	)
}

export default isTablet
