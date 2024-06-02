import { useCallback, useRef } from "react"

import ReadonlyRefObject from "./ReadonlyRefObject"
import tuple from "./tuple"

/**
 * Use a flag that will reset back to the base state after a short delay. This is
 *   basically a shortcut for the pattern where you set a boolean value on a react ref,
 *   then set a timeout to reset it after a short time.
 */
function useToggledFlag(baseState: boolean, delay = 100) {
	const ref = useRef(baseState)

	const toggle = useCallback(() => {
		ref.current = !baseState

		setTimeout(() => {
			ref.current = baseState
		}, delay)
	}, [baseState, delay])

	return tuple(ref as ReadonlyRefObject<boolean>, toggle)
}

export default useToggledFlag
