import { useRef } from "react"

/**
 * Call a callback only the first time through a component, at "constructor" time (before the first mount or anything).
 *
 * @param callback The callback to call the first time through this component.
 */
export function useConstructor(callback: () => unknown) {
	const hasRun = useRef(false)

	if (!hasRun.current) {
		hasRun.current = true

		callback()
	}
}
