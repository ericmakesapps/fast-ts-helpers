import { DependencyList, useEffect, useMemo, useRef } from "react"

import throttle from "./throttle"

if (typeof window !== "undefined" && !window.ResizeObserver) {
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
function useObserveSize<T extends Element>(
	callback: (target: T) => void,
	deps: DependencyList
) {
	const elementRef = useRef<T>(null)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const cb = useMemo(() => throttle(callback), deps)

	useEffect(() => {
		const element = elementRef.current

		if (element) {
			cb(element)

			const observer = new ResizeObserver(() => cb(element))

			observer.observe(element)

			return () => observer.disconnect()
		}

		return undefined
	}, [cb])

	return elementRef
}

export default useObserveSize
