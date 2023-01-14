import { DependencyList } from "react"

import useConstructor from "./useConstructor"
import useObserveSize from "./useObserveSize"

/**
 * Calls a function when this component mounts, and any time the window width changes. This is higher fidelity than the window resize event (which sometimes skips sizes which can result in unexpected behavior).
 *
 * @param callback The function that will be called.
 * @param deps The dependencies of the passed function.
 */
function useObserveWindowWidth(callback: ResizeObserverCallback, deps: DependencyList) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const ref = useObserveSize(callback, deps)

	useConstructor(() => {
		ref(document.documentElement)
	})
}

export default useObserveWindowWidth
