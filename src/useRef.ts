import { MutableRefObject, useMemo } from "react"

import isCallable from "./isCallable"

/**
 * Get a ref object that can be initialized with a initializer function. This allows
 *   complex or expensive initializations to only occur the first time.
 *
 * @param initialValue The initial value or initializer of the ref.
 * @returns The ref object.
 */
function useRef<T>(initialValue: T | (() => T)): MutableRefObject<T>
function useRef<T>(
	initialState?: T | (() => T | undefined) | undefined
): MutableRefObject<T | undefined>

function useRef<T>(initialState?: T | (() => T)) {
	return useMemo(
		() => ({
			current: isCallable(initialState) ? initialState() : initialState
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)
}

export default useRef
