import { Dispatch, SetStateAction } from "react"

import isCallable from "./isCallable"
import ReadonlyRefObject from "./ReadonlyRefObject"
import useBackedRef from "./useBackedRef"

/**
 * Use a ref variable backed by session storage. This is designed only for local access to the variable value (not across different components/environments).
 *
 * @param name The name under which to store the variable. This value should be unique across the app for this one component/page. Don’t use it across components/pages to try to share the value updates. That won’t work.
 * @param initialValue The initial value, if any, of the value.
 */
function useSessionRef<T>(
	name: string,
	initialValue: T | (() => T)
): [ReadonlyRefObject<T>, Dispatch<SetStateAction<T>>]
function useSessionRef<T>(
	name: string,
	initialValue?: T | (() => T | undefined) | undefined
): [ReadonlyRefObject<T | undefined>, Dispatch<SetStateAction<T | undefined>>]

function useSessionRef<T>(name: string, initialValue?: T | (() => T)) {
	return useBackedRef<T>(
		(newValue) => {
			if (newValue !== undefined) {
				sessionStorage.setItem(name, JSON.stringify(newValue))
			} else {
				sessionStorage.removeItem(name)
			}
		},
		[name],
		() =>
			name in sessionStorage
				? JSON.parse(sessionStorage.getItem(name)!)
				: isCallable(initialValue)
					? initialValue()
					: initialValue
	)
}

export default useSessionRef
