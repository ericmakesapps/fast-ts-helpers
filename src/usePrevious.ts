import { useRef } from "react"

/**
 * Return the previous value of a variable (good for change detection).
 *
 * @param value The current value
 * @returns The previous value passed to this hook (or undefined if this is the first time).
 */
function usePrevious<T>(value: T, startUndefined: true): T | undefined

/**
 * Return the previous value of a variable (good for change detection).
 *
 * @param value The current value
 * @returns The previous value passed to this hook (or the current value if this is the first time).
 */
function usePrevious<T>(value: T, startUndefined?: false): T

function usePrevious<T>(value: T, startUndefined = false) {
	const currentValue = useRef(startUndefined ? undefined : value)

	// Store the previous value in a local variable, to return in a sec.
	const previousValue = currentValue.current

	// Save the current value into the ref.
	currentValue.current = value

	// Return the previous value.
	return previousValue
}

export default usePrevious
