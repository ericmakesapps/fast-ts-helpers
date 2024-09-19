/* eslint-disable no-restricted-globals */
import { SetStateAction, useCallback, useEffect, useMemo } from "react"

import isCallable from "./isCallable"
import isJsonlike from "./isJsonlike"
import ReadonlyRefObject from "./ReadonlyRefObject"
import useBackedRef from "./useBackedRef"

/**
 * Use a ref backed by a search parameter in the path.
 *
 * @param name The name under which to store the parameter. This value should be unique across the app for this one component/page. Don’t use it across components/pages to try to share the value updates. That won’t work.
 * @param initialValue The initial value, if any, of the parameter.
 * @param defaultAction The default action to use when setting the state, whether push or replace. Defaults to `"replace"`.
 */
function useSearchRef<T>(
	name: string,
	initialValue: T | (() => T),
	defaultAction?: "replace" | "push"
): [ReadonlyRefObject<T>, (value: SetStateAction<T>, action?: "replace" | "push") => void]
function useSearchRef<T>(
	name: string,
	initialValue?: T | (() => T | undefined) | undefined,
	defaultAction?: "replace" | "push"
): [
	ReadonlyRefObject<T | undefined>,
	(value: SetStateAction<T | undefined>, action?: "replace" | "push") => void
]

function useSearchRef<T>(
	name: string,
	__initialValue?: T | (() => T),
	defaultAction: "replace" | "push" = "replace"
) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initialValue = useMemo(() => __initialValue, [])

	const getValue = useCallback(
		(initialValue?: typeof __initialValue) => {
			const params = new URLSearchParams(location.search)

			const value = params.get(name)

			return value != null
				? isJsonlike(value)
					? JSON.parse(value)
					: value
				: isCallable(initialValue)
					? initialValue()
					: initialValue
		},
		[name]
	)

	const [value, setter, underlyingRef] = useBackedRef<T, [action?: "replace" | "push"]>(
		(newValue, action = defaultAction) => {
			if (newValue !== getValue()) {
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
			}
		},
		[defaultAction, getValue, name],
		() => getValue(initialValue)
	)

	useEffect(() => {
		const handleNav = () => (underlyingRef.current = getValue(initialValue))

		window.addEventListener("popstate", handleNav)

		return () => window.removeEventListener("popstate", handleNav)
	}, [getValue, initialValue, underlyingRef])

	return [value, setter]
}

export default useSearchRef
