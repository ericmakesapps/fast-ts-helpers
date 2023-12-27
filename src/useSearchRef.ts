/* eslint-disable no-restricted-globals */
import { Dispatch, SetStateAction } from "react"

import isCallable from "./isCallable"
import ReadonlyRefObject from "./ReadonlyRefObject"
import useBackedRef from "./useBackedRef"

/**
 * Use a ref backed by a search parameter in the path.
 *
 * @param name The name under which to store the parameter. This value should be unique across the app for this one component/page. Don’t use it across components/pages to try to share the value updates. That won’t work.
 * @param initialValue The initial value, if any, of the parameter.
 */
function useSearchRef<T>(
	name: string,
	initialValue: T | (() => T)
): [ReadonlyRefObject<T>, Dispatch<SetStateAction<T>>]
function useSearchRef<T>(
	name: string,
	initialValue?: T | (() => T | undefined) | undefined
): [ReadonlyRefObject<T | undefined>, Dispatch<SetStateAction<T | undefined>>]

function useSearchRef<T>(name: string, initialValue?: T | (() => T)) {
	return useBackedRef<T>(
		(newValue) => {
			const url = new URL(location.href)

			if (newValue !== undefined) {
				url.searchParams.set(name, JSON.stringify(newValue))
			} else {
				url.searchParams.delete(name)
			}

			history.replaceState(history.state, "", url)
		},
		[name],
		() => {
			const params = new URLSearchParams(location.search)

			return name in params
				? (JSON.parse(params.get(name)!) as T)
				: isCallable(initialValue)
					? initialValue()
					: initialValue
		}
	)
}

export default useSearchRef
