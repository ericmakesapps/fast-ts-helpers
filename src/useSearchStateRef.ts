import { MutableRefObject, SetStateAction, useCallback, useEffect, useRef } from "react"

import isCallable from "./isCallable"
import useSearchState from "./useSearchState"

/**
 * Get a state value that is saved as a search param, that also has a ref pointing to the
 *   current value. The setter callback will set both the state, update the search param,
 *   and update the ref.
 *
 * @param name The name under which to store the parameter. This value should be unique across the app for this one component/page. Don’t use it across components/pages to try to share the value updates. That won’t work.
 * @param initialValue The initial value, if any, of the parameter.
 * @param defaultAction The default action to use when setting the state, whether push or replace. Defaults to `"replace"`.
 */
function useSearchStateRef<T>(
	name: string,
	initialValue: T | (() => T),
	defaultAction?: "replace" | "push"
): [
	Readonly<MutableRefObject<T>>,
	(value: SetStateAction<T>, action?: "replace" | "push") => void,
	T
]
function useSearchStateRef<T>(
	name: string,
	initialValue?: T | (() => T | undefined) | undefined,
	defaultAction?: "replace" | "push"
): [
	Readonly<MutableRefObject<T | undefined>>,
	(value: SetStateAction<T | undefined>, action?: "replace" | "push") => void,
	T | undefined
]

function useSearchStateRef<T>(
	name: string,
	initialValue?: T | (() => T),
	defaultAction: "replace" | "push" = "replace"
) {
	const [state, setState] = useSearchState(name, initialValue, defaultAction)
	const ref = useRef(state)

	useEffect(() => {
		ref.current = state
	}, [state])

	return [
		ref,
		useCallback<typeof setState>(
			(valueOrFunction, action = defaultAction) => {
				setState(
					isCallable(valueOrFunction)
						? (currentValue) => (ref.current = valueOrFunction(currentValue))
						: (ref.current = valueOrFunction),
					action
				)
			},
			[defaultAction, setState]
		),
		state
	]
}

export default useSearchStateRef
