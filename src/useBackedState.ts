import { DependencyList, Dispatch, SetStateAction, useCallback, useState } from "react"

import isCallable from "./isCallable"

/**
 * Use a state that has some backing for its initial value.
 *
 * @param set A callback to set the value in the backing. This is used each time the setter is called.
 * @param deps The dependency list for the set callback.
 * @param getInitialValue A callback to get the initial value (from the backing store, or whatever, as desired). This is only called once, in initializing this state.
 */
function useBackedState<T>(
	set: (newValue: T) => void,
	deps: DependencyList,
	getInitialValue: () => T
): [T, Dispatch<SetStateAction<T>>]
function useBackedState<T>(
	set: (newValue: T | undefined) => void,
	deps: DependencyList,
	getInitialValue: () => T | undefined
): [T | undefined, Dispatch<SetStateAction<T | undefined>>]

function useBackedState<T>(
	set: (newValue: T | undefined) => void,
	deps: DependencyList,
	getInitialValue: () => T | undefined
) {
	const [value, setValue] = useState(getInitialValue)

	return [
		value,
		useCallback<typeof setValue>(
			(valueOrGetter) => {
				setValue((value) => {
					const newValue = isCallable(valueOrGetter)
						? valueOrGetter(value)
						: valueOrGetter

					if (newValue !== value) {
						set(newValue)
					}

					return newValue
				})
			},
			// eslint-disable-next-line react-hooks/exhaustive-deps
			deps
		)
	]
}

export default useBackedState
