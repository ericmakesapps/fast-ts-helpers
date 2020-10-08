import { useCallback, useState } from "react"

import { useObserveWindowWidth } from "./useObserveWindowWidth"

/**
 * Triggers a state update whenever the width of the window crosses one of the passed breakpoints. These should be passed in ascending order. This returns the index of the breakpoint below which the size currently is. For example, if the passed breakpoints were `[767, 1024]` and the screen width was currently `500`, the returned value would be `0`. If the screen with was `900` with the same breakpoints, the returned value would be `1`. If the screen width was `1200`, the returned value would be `2`.
 *
 * @param breakpoints The breakpoints at which to trigger a state update.
 * @returns The index of the currently triggered breakpoint.
 */
export function useBreakpoints(breakpoints: number[]) {
	const current = useCallback(() => {
		const index = breakpoints.findIndex((b) => window.innerWidth < b)

		return index >= 0 ? index : breakpoints.length
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, breakpoints)

	const [breakpoint, setBreakpoint] = useState(current())

	useObserveWindowWidth(() => setBreakpoint(current()), [current])

	return breakpoint
}
