import { useState } from "react"

import { useObserveWindowWidth } from "./useObserveWindowWidth"
import { isMobile } from "./isMobile"

/**
 * Triggers a state update whenever the value of isMobile changes.
 *
 * @returns Whether the viewport is currently mobile.
 */
export function useIsMobile() {
	const [is, setIs] = useState(isMobile())

	useObserveWindowWidth(() => setIs(isMobile()), [])

	return is
}
