import { Dispatch, SetStateAction } from "react"

import isCallable from "./isCallable"
import ReadonlyRefObject from "./ReadonlyRefObject"
import Storage from "./Storage"
import useBackedRef from "./useBackedRef"

/**
 * Store a ref that is backed by local storage to be persistent.
 *
 * @param name The name under which to store the parameter. This value should be unique across the app for this one component/page. Don’t use it across components/pages to try to share the value updates. That won’t work.
 * @param initialValue The initial value, if any, of the parameter.
 */
function useLocalStorageRef<T>(
	name: string,
	initialValue: T | (() => T)
): [ReadonlyRefObject<T>, Dispatch<SetStateAction<T>>]
function useLocalStorageRef<T>(
	name: string,
	initialValue?: T | (() => T | undefined) | undefined
): [ReadonlyRefObject<T | undefined>, Dispatch<SetStateAction<T | undefined>>]

function useLocalStorageRef<T>(name: string, initialValue?: T | (() => T)) {
	return useBackedRef<T>(
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

export default useLocalStorageRef
