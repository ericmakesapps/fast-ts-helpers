/* eslint-disable no-restricted-globals */
import { Dispatch, SetStateAction } from "react"

import isCallable from "./isCallable"
import isJsonlike from "./isJsonlike"
import useBackedState from "./useBackedState"

/**
 * Use a state backed by a search parameter in the path.
 *
 * @param name The name under which to store the parameter. This value should be unique across the app for this one component/page. Don’t use it across components/pages to try to share the value updates. That won’t work.
 * @param initialValue The initial value, if any, of the parameter.
 */
function useSearchState<T>(
	name: string,
	initialValue: T | (() => T)
): [T, Dispatch<SetStateAction<T>>]
function useSearchState<T>(
	name: string,
	initialValue?: T | (() => T | undefined) | undefined
): [T | undefined, Dispatch<SetStateAction<T | undefined>>]

function useSearchState<T>(name: string, initialValue?: T | (() => T)) {
	return useBackedState<T>(
		(newValue) => {
			const url = new URL(location.href)

			if (newValue !== undefined) {
				url.searchParams.set(
					name,
					typeof newValue !== "string" || isJsonlike(newValue)
						? JSON.stringify(newValue)
						: newValue
				)
			} else {
				url.searchParams.delete(name)
			}

			history.replaceState(history.state, "", url)
		},
		[name],
		() => {
			const params = new URLSearchParams(location.search)

			const value = params.get(name)

			return value != null
				? isJsonlike(value)
					? JSON.parse(value)
					: value
				: isCallable(initialValue)
					? initialValue()
					: initialValue
		}
	)
}

export default useSearchState
