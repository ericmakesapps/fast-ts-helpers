import { useEffect, useRef } from "react"

/**
 * Return the previous value of a variable (good for change detection).
 *
 * @param value The current value
 * @returns The previous value passed to this hook (or undefined if this is the first time).
 */
export function usePrevious<T>(value: T, startUndefined: true): T | undefined

/**
 * Return the previous value of a variable (good for change detection).
 *
 * @param value The current value
 * @returns The previous value passed to this hook (or the current value if this is the first time).
 */
export function usePrevious<T>(value: T, startUndefined?: false): T

export function usePrevious<T>(value: T, startUndefined = false) {
	const ref = useRef(startUndefined ? undefined : value)

	useEffect(() => void (ref.current = value), [value])

	return ref.current
}
