import checkBounds from "./checkBounds"
import tabletBreakpoint from "./tabletBreakpoint"

/**
 * Check whether the screen is currently at a desktop viewport size.
 *
 * @returns Whether the viewport is currently desktop.
 */
function isDesktop() {
	return checkBounds(window.innerWidth, [tabletBreakpoint + 1, Infinity])
}

export default isDesktop
