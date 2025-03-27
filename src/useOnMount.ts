import { useEffect, useRef } from "react"

/**
 * Run a callback only on mount, and optionally a cleanup callback on unmount.
 *
 * @param callback The callback to run on mount, which can return a clean-up for unmount.
 */
function useOnMount(callback: (() => void) | (() => () => void)) {
	const cb = useRef(callback)

	cb.current = callback

	useEffect(() => {
		const destroy = cb.current()

		if (typeof destroy === "function") {
			return destroy
		}

		return undefined
	}, [])
}

export default useOnMount
