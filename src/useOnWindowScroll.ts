import { DependencyList, useEffect, useMemo } from "react"

import { throttle } from "./throttle"

/**
 * Calls a function when this component mounts, and any time the window scroll event is called.
 *
 * @param callback The function that will be called.
 * @param deps The dependencies of the passed function.
 */
export function useOnWindowScroll(callback: () => void, deps: DependencyList) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const cb = useMemo(() => throttle(callback), deps)

	useEffect(() => {
		cb()

		window.addEventListener(`scroll`, cb)

		return () => window.removeEventListener(`scroll`, cb)
	}, [cb])
}
