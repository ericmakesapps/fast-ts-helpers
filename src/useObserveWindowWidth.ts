import { DependencyList, MutableRefObject } from "react"

import useObserveSize from "./useObserveSize"

/**
 * Calls a function when this component mounts, and any time the window width changes.
 *   This is higher fidelity than the window resize event (which sometimes skips sizes
 *   which can result in unexpected behavior).
 *
 * @param callback The function that will be called.
 * @param deps The dependencies of the passed function.
 * @param options An object of options.
 */
function useObserveWindowWidth(
	callback: () => void,
	deps: DependencyList,
	options: { noThrottle?: boolean } = {}
) {
	const ref = useObserveSize(callback, deps, options) as MutableRefObject<HTMLElement>

	if (typeof document !== "undefined") {
		ref.current = document.documentElement
	}
}

export default useObserveWindowWidth
