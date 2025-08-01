import { useRef } from "react"

import ReadonlyRefObject from "./ReadonlyRefObject"

/**
 * Get a ref object that gets updated to the passed value automatically. This is useful if
 *   you need a ref to a value that can change but shouldn't trigger reloads. We return a
 *   `ReadonlyRefObject` to prevent accidental mutations that would be overwritten.
 */
function useUpdatingRef<T>(value: T): ReadonlyRefObject<T> {
	const ref = useRef(value)

	ref.current = value

	return ref
}

export default useUpdatingRef
