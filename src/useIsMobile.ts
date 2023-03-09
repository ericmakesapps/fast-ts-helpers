import { useState } from "react"

import isMobile from "./isMobile"
import useObserveWindowWidth from "./useObserveWindowWidth"

/**
 * Triggers a state update whenever the value of isMobile changes.
 *
 * @returns Whether the viewport is currently mobile.
 */
function useIsMobile() {
	const [is, setIs] = useState(isMobile())

	useObserveWindowWidth(() => setIs(isMobile()), [])

	return is
}

export default useIsMobile
