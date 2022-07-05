import { useIsDark } from "./useIsDark"

/**
 * Check whether the browser is preferring light mode right now. Updates according to the browser preference.
 *
 * @returns Whether the browser currently prefers light mode
 */
export function useIsLight() {
	return !useIsDark()
}
