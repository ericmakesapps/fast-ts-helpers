import { Dispatch, SetStateAction } from "react"

import isCallable from "./isCallable"
import Storage from "./Storage"
import useBackedState from "./useBackedState"

/**
 * Store a state that is backed by local storage to be persistent.
 *
 * @param name The name under which to store the parameter. This value should be unique across the app for this one component/page. Don’t use it across components/pages to try to share the value updates. That won’t work.
 * @param initialValue The initial value, if any, of the parameter.
 */
function useLocalStorageState<T>(
	name: string,
	initialValue: T | (() => T)
): [T, Dispatch<SetStateAction<T>>]
function useLocalStorageState<T>(
	name: string,
	initialValue?: T | (() => T | undefined) | undefined
): [T | undefined, Dispatch<SetStateAction<T | undefined>>]

function useLocalStorageState<T>(name: string, initialValue?: T | (() => T)) {
	return useBackedState<T>(
		(newValue) => {
			if (newValue !== undefined) {
				Storage.set(name, newValue)
			} else {
				Storage.remove(name)
			}
		},
		[name],
		() =>
			Storage.has(name)
				? Storage.get<T>(name)
				: isCallable(initialValue)
					? initialValue()
					: initialValue
	) as any
}

export default useLocalStorageState
