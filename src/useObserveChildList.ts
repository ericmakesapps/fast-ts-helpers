import { DependencyList } from "react"

import useObserve from "./useObserve"

/**
 * Calls a function when this component mounts, and any time a child is added to or removed from the element to which the ref is attached.
 *
 * @param callback The function that will be called.
 * @param deps The dependencies of the function (for caching).
 * @returns The ref callback to attach to the component to observe.
 */
function useObserveChildList(callback: MutationCallback, deps: DependencyList) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useObserve(callback, deps, {
		childList: true
	})
}

export default useObserveChildList
