import { DependencyList, SetStateAction, useCallback, useMemo, useRef } from "react"

import isCallable from "./isCallable"
import ReadonlyRefObject from "./ReadonlyRefObject"

/**
 * Use a ref that has some backing for its initial value.
 *
 * @param set A callback to set the value in the backing. This is used each time the setter is called.
 * @param deps The dependency list for the set callback.
 * @param getInitialValue A callback to get the initial value (from the backing store, or whatever, as desired). This is only called once, in initializing this ref.
 */
function useBackedRef<T, Args extends any[] = []>(
	set: (newValue: T, ...args: Args) => void,
	deps: DependencyList,
	getInitialValue: () => T
): [ReadonlyRefObject<T>, (value: SetStateAction<T>, ...args: Args) => void]
function useBackedRef<T, Args extends any[] = []>(
	set: (newValue: T | undefined, ...args: Args) => void,
	deps: DependencyList,
	getInitialValue: () => T | undefined
): [
	ReadonlyRefObject<T | undefined>,
	(value: SetStateAction<T | undefined>, ...args: Args) => void
]

function useBackedRef<T, Args extends any[] = []>(
	set: (newValue: T | undefined, ...args: Args) => void,
	deps: DependencyList,
	getInitialValue: () => T | undefined
) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const value = useRef(useMemo(getInitialValue, []))

	return [
		value,
		useCallback<(value: SetStateAction<T | undefined>, ...args: Args) => void>(
			(valueOrGetter, ...args) => {
				const newValue = isCallable(valueOrGetter)
					? valueOrGetter(value.current)
					: valueOrGetter

				if (newValue !== value.current) {
					set(newValue, ...(args as any))
					value.current = newValue
				}
			},
			// eslint-disable-next-line react-hooks/exhaustive-deps
			deps
		)
	]
}

export default useBackedRef
