/* eslint-disable no-restricted-globals */
import { SetStateAction, useCallback, useEffect } from "react"

import isCallable from "./isCallable"
import isJsonlike from "./isJsonlike"
import useBackedState from "./useBackedState"

/**
 * Use a state backed by a search parameter in the path.
 *
 * @param name The name under which to store the parameter. This value should be unique across the app for this one component/page. Don’t use it across components/pages to try to share the value updates. That won’t work.
 * @param initialValue The initial value, if any, of the parameter.
 * @param defaultAction The default action to use when setting the state, whether push or replace. Defaults to `"replace"`.
 */
function useSearchState<T>(
	name: string,
	initialValue: T | (() => T),
	defaultAction?: "replace" | "push"
): [T, (value: SetStateAction<T>, action?: "replace" | "push") => void]
function useSearchState<T>(
	name: string,
	initialValue?: T | (() => T | undefined) | undefined,
	defaultAction?: "replace" | "push"
): [
	T | undefined,
	(value: SetStateAction<T | undefined>, action?: "replace" | "push") => void
]

function useSearchState<T>(
	name: string,
	initialValue?: T | (() => T),
	defaultAction: "replace" | "push" = "replace"
) {
	const getValue = useCallback(() => {
		const params = new URLSearchParams(location.search)

		const value = params.get(name)

		return value != null
			? isJsonlike(value)
				? JSON.parse(value)
				: value
			: isCallable(initialValue)
				? initialValue()
				: initialValue
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name])

	const [value, setter] = useBackedState<T, [action?: "replace" | "push"]>(
		(newValue, action = defaultAction) => {
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

			history[`${action}State`](history.state, "", url)
		},
		[defaultAction, name],
		getValue
	)

	useEffect(() => {
		const handleNav = () => setter(getValue(), "replace")

		window.addEventListener("popstate", handleNav)

		return () => window.removeEventListener("popstate", handleNav)
	}, [getValue, setter])

	return [value, setter]
}

export default useSearchState
