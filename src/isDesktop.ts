import { tabletBreakpoint } from "./tabletBreakpoint"
import { checkBounds } from "./checkBounds"

/**
 * Check whether the screen is currently at a desktop viewport size.
 *
 * @returns Whether the viewport is currently desktop.
 */
export function isDesktop() {
	return checkBounds(window.innerWidth, [tabletBreakpoint + 1, Infinity])
}
