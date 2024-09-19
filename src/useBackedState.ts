import { DependencyList, Dispatch, SetStateAction, useCallback, useState } from "react"

import isCallable from "./isCallable"

/**
 * Use a state that has some backing for its initial value.
 *
 * @param set A callback to set the value in the backing. This is used each time the setter is called.
 * @param deps The dependency list for the set callback.
 * @param getInitialValue A callback to get the initial value (from the backing store, or whatever, as desired). This is only called once, in initializing this state.
 */
function useBackedState<T, Args extends any[] = []>(
	set: (newValue: T, ...args: Args) => void,
	deps: DependencyList,
	getInitialValue: () => T
): [
	T,
	(value: SetStateAction<T>, ...args: Args) => void,
	underlyingSetter: Dispatch<SetStateAction<T>>
]
function useBackedState<T, Args extends any[] = []>(
	set: (newValue: T | undefined) => void,
	deps: DependencyList,
	getInitialValue: () => T | undefined
): [
	T | undefined,
	(value: SetStateAction<T | undefined>, ...args: Args) => void,
	underlyingSetter: Dispatch<SetStateAction<T | undefined>>
]

function useBackedState<T, Args extends any[] = []>(
	set: (newValue: T | undefined, ...args: Args) => void,
	deps: DependencyList,
	getInitialValue: () => T | undefined
) {
	const [value, setValue] = useState(getInitialValue)

	return [
		value,
		useCallback<(value: SetStateAction<T | undefined>, ...args: Args) => void>(
			(valueOrGetter, ...args) => {
				setValue((value) => {
					const newValue = isCallable(valueOrGetter)
						? valueOrGetter(value)
						: valueOrGetter

					if (newValue !== value) {
						set(newValue, ...(args as any))
					}

					return newValue
				})
			},
			// eslint-disable-next-line react-hooks/exhaustive-deps
			deps
		),
		setValue
	]
}

export default useBackedState
