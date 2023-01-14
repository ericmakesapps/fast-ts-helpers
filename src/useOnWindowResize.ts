import { DependencyList, useEffect, useMemo } from "react"

import throttle from "./throttle"

/**
 * Calls a function when this component mounts, and any time the window resize event is called.
 *
 * @param callback The function that will be called.
 * @param deps The dependencies of the passed function.
 */
function useOnWindowResize(callback: () => void, deps: DependencyList) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const cb = useMemo(() => throttle(callback), deps)

	useEffect(() => {
		cb()

		window.addEventListener(`resize`, cb)

		return () => window.removeEventListener(`resize`, cb)
	}, [cb])
}

export default useOnWindowResize
