import { ChangeEvent, useRef } from "react"

import { tuple } from "./tuple"

/**
 * Get a ref and callback to track the value of something using an onChange. This does not update state when the onChange is called.
 *
 * @returns A tuple containing a ref to the current value of something that has an onChange event, and a callback to pass to the onChange of something.
 */
export function useChange<Type = string>() {
	const value = useRef<Type>()

	return tuple(value, (event: ChangeEvent<{ value: Type }>) => {
		value.current = event.target.value
	})
}
