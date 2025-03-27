import { useEffect, useRef } from "react"

/**
 * Run a callback only on unmount.
 *
 * @param callback The callback to run on unmount.
 */
function useOnUnmount(callback: () => void) {
	const cb = useRef(callback)

	cb.current = callback

	useEffect(() => {
		return cb.current
	}, [])
}

export default useOnUnmount
