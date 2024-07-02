import { Dispatch, MutableRefObject, SetStateAction, useCallback } from "react"

import isCallable from "./isCallable"
import useSharedRef from "./useSharedRef"
import useSharedState from "./useSharedState"

/**
 * Get a ref and state value for a given shared state value. This allows sharing a value
 *   between components without passing the value and setting across various component
 *   trees. The callback that is returned sets both the ref and state.
 *
 * @param name The name of the state/ref to share.
 * @param initialValue The initial value of the state/ref.
 * @returns A tuple containing the ref, the setter, and the state values.
 */
function useSharedStateRef<T>(
	initialValue: T | (() => T)
): [Readonly<MutableRefObject<T>>, Dispatch<SetStateAction<T>>, T]
function useSharedStateRef<T>(
	initialState?: T | (() => T | undefined) | undefined
): [
	Readonly<MutableRefObject<T | undefined>>,
	Dispatch<SetStateAction<T | undefined>>,
	T | undefined
]

function useSharedStateRef<T>(name: string, initialState?: T | (() => T)) {
	const [state, setState] = useSharedState(name, initialState)
	const ref = useSharedRef(name, state)

	return [
		ref,
		useCallback<typeof setState>(
			(valueOrFunction) => {
				setState(
					isCallable(valueOrFunction)
						? (currentValue) => (ref.current = valueOrFunction(currentValue))
						: (ref.current = valueOrFunction)
				)
			},
			[ref, setState]
		),
		state
	]
}

export default useSharedStateRef
