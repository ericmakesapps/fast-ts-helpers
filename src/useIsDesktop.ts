import { useState } from "react"

import { isDesktop } from "./isDesktop"
import { useObserveWindowWidth } from "./useObserveWindowWidth"

/**
 * Triggers a state update whenever the value of isDesktop changes.
 *
 * @returns Whether the viewport is currently desktop.
 */
export function useIsDesktop() {
	const [is, setIs] = useState(isDesktop())

	useObserveWindowWidth(() => setIs(isDesktop()), [])

	return is
}
