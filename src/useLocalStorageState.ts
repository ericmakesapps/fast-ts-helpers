import { SetStateAction } from "react"

import Storage from "./Storage"
import useBackedState from "./useBackedState"

/**
 * Store a state that is backed by local storage to be persistent.
 *
 * @param name The name under which to store the parameter. This value should be unique across the app for this one component/page. Don’t use it across components/pages to try to share the value updates. That probably won’t work.
 * @param defaultValue The default value, if any, of the parameter.
 */
function useLocalStorageState<T>(
	name: string,
	defaultValue: T
): [T, (newValue: SetStateAction<T>) => void]
function useLocalStorageState<T>(
	name: string,
	defaultValue?: T
): [T | undefined, (newValue: SetStateAction<T | undefined>) => void]

function useLocalStorageState<T>(name: string, defaultValue?: T) {
	return useBackedState<T>(
		(newValue) => Storage.set(name, newValue),
		[name],
		() => Storage.get<T>(name),
		defaultValue
	)
}

export default useLocalStorageState
