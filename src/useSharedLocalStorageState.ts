import { Dispatch, SetStateAction, useCallback } from "react"

import isCallable from "./isCallable"
import Storage from "./Storage"
import tuple from "./tuple"
import useSharedState from "./useSharedState"

/**
 * Use a shared state variable that is also stored in localStorage, such that other
 *   contexts at the same host can change the value and all consumers will be updated.
 */
function useSharedLocalStorageState<T>(
	box: string,
	defaultValue: T
): [T, Dispatch<SetStateAction<T>>]
function useSharedLocalStorageState<T>(
	box: string,
	defaultValue?: undefined
): [T | undefined, Dispatch<SetStateAction<T | undefined>>]

function useSharedLocalStorageState<T>(name: string, initialValue?: T | (() => T)) {
	const [value, setValue] = useSharedState(
		name,
		Storage.has(name) ? Storage.get(name) : initialValue
	)

	if (!Storage.has(name)) {
		Storage.set(name, value)
	}

	return tuple(
		value,
		useCallback<typeof setValue>(
			(valueOrFactory) => {
				if (isCallable(valueOrFactory)) {
					setValue((value) => {
						const newValue = valueOrFactory(value)

						Storage.set(name, newValue)

						return newValue
					})
				} else {
					Storage.set(name, valueOrFactory)

					setValue(valueOrFactory)
				}
			},
			[name, setValue]
		)
	)
}

export default useSharedLocalStorageState
