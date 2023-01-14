import { useState } from "react"

import isTablet from "./isTablet"
import useObserveWindowWidth from "./useObserveWindowWidth"

/**
 * Triggers a state update whenever the value of isTablet changes.
 *
 * @returns Whether the viewport is currently tablet.
 */
function useIsTablet() {
	const [is, setIs] = useState(isTablet())

	useObserveWindowWidth(() => setIs(isTablet()), [])

	return is
}

export default useIsTablet
