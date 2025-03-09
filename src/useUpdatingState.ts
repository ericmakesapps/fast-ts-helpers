import { DependencyList, Dispatch, SetStateAction, useEffect, useState } from "react"

import isCallable from "./isCallable"

/**
 * This state variable will update to the value passed to it if it changed. It's useful
 * for when the state value also needs to track an external value.
 */
function useUpdatingState<T>(
	getter: (currentValue?: T) => T,
	deps: DependencyList
): [T, Dispatch<SetStateAction<T>>]
function useUpdatingState<T>(value: T): [T, Dispatch<SetStateAction<T>>]

function useUpdatingState<T>(
	valueOrGetter: (T & Exclude<T, Function>) | ((currentValue?: T) => T),
	deps?: DependencyList
) {
	const state = useState(valueOrGetter)

	useEffect(
		() => {
			state[1](valueOrGetter)
		},
		// Since `deps` is the dependency list for `valueOrGetter` if it is callable, we
		//   pass it directly as the list in that case. However if `valueOrGetter` is not
		//   callable, we use its value as the dependency in the dependency list.

		// eslint-disable-next-line react-hooks/exhaustive-deps
		isCallable(valueOrGetter) ? deps : [valueOrGetter]
	)

	return state
}

export default useUpdatingState
