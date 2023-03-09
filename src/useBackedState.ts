import { DependencyList, SetStateAction, useCallback, useMemo, useState } from "react"

import isCallable from "./isCallable"
import tuple from "./tuple"

/**
 * Use a state that has some backing for its initial value.
 *
 * @param set A callback to set the value in the backing. This is used each time the setter is called.
 * @param deps The dependency list for the set callback.
 * @param get A callback to get the initial value from backing. This is only used in initializing this ref.
 * @param defaultValue The default value to use for the value.
 */
function useBackedState<T>(
	set: (newValue: T) => void,
	deps: DependencyList,
	get: () => T,
	defaultValue: T
): [T, (newValue: SetStateAction<T>) => void]
function useBackedState<T>(
	set: (newValue: T | undefined) => void,
	deps: DependencyList,
	get: () => T | undefined,
	defaultValue?: T
): [T | undefined, (newValue: SetStateAction<T | undefined>) => void]

function useBackedState<T>(
	set: (newValue: T | undefined) => void,
	deps: DependencyList,
	get: () => T | undefined,
	defaultValue?: T
) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const [value, setValue] = useState(useMemo(get, []) ?? defaultValue)

	return tuple(
		value,
		useCallback<typeof setValue>(
			(valueOrGetter) => {
				if (isCallable(valueOrGetter)) {
					setValue((value) => {
						const newValue = valueOrGetter(value)

						set(newValue)

						return newValue
					})
				} else {
					const newValue = valueOrGetter

					set(newValue)
					setValue(newValue)
				}
			},
			// eslint-disable-next-line react-hooks/exhaustive-deps
			deps
		)
	)
}

export default useBackedState
