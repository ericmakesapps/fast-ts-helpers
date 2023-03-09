import {
	DependencyList,
	Dispatch,
	SetStateAction,
	useCallback,
	useMemo,
	useRef
} from "react"

import isCallable from "./isCallable"
import ReadonlyRefObject from "./ReadonlyRefObject"

/**
 * Use a ref that has some backing for its initial value.
 *
 * @param set A callback to set the value in the backing. This is used each time the setter is called.
 * @param deps The dependency list for the set callback.
 * @param getInitialValue A callback to get the initial value (from the backing store, or whatever, as desired). This is only called once, in initializing this ref.
 */
function useBackedRef<T>(
	set: (newValue: T) => void,
	deps: DependencyList,
	getInitialValue: () => T
): [ReadonlyRefObject<T>, Dispatch<SetStateAction<T>>]
function useBackedRef<T>(
	set: (newValue: T | undefined) => void,
	deps: DependencyList,
	getInitialValue: () => T | undefined
): [ReadonlyRefObject<T | undefined>, Dispatch<SetStateAction<T | undefined>>]

function useBackedRef<T>(
	set: (newValue: T | undefined) => void,
	deps: DependencyList,
	getInitialValue: () => T | undefined
) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const value = useRef(useMemo(getInitialValue, []))

	return [
		value,
		useCallback<Dispatch<SetStateAction<T | undefined>>>(
			(valueOrGetter) => {
				const newValue = isCallable(valueOrGetter)
					? valueOrGetter(value.current)
					: valueOrGetter

				if (newValue !== value.current) {
					set(newValue)
					value.current = newValue
				}
			},
			// eslint-disable-next-line react-hooks/exhaustive-deps
			deps
		)
	]
}

export default useBackedRef
