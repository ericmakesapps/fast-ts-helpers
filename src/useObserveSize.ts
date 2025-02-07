import { DependencyList, useEffect, useMemo, useState } from "react"

import throttle from "./throttle"

if (!window.ResizeObserver) {
	throw new Error(
		"ResizeObserver is not supported in this browser. Please include a polyfill."
	)
}

/**
 * Calls a function when this component mounts, and any time the element to which the ref is attached resizes.
 *
 * @param callback The function that will be called.
 * @param deps The dependencies of the function (for caching).
 * @returns The ref callback to attach to the component to observe.
 */
function useObserveSize(callback: ResizeObserverCallback, deps: DependencyList) {
	const [element, setElement] = useState<Element | null>(null)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const cb = useMemo(() => throttle(callback), deps)

	useEffect(() => {
		if (element) {
			const observer = new ResizeObserver(cb)

			cb([], observer)

			observer.observe(element)

			return () => observer.disconnect()
		}

		return undefined
	}, [cb, element])

	return setElement as (element: Element | null) => void
}

export default useObserveSize
