import {
	DependencyList,
	Dispatch,
	MutableRefObject,
	SetStateAction,
	useEffect
} from "react"

import isCallable from "./isCallable"
import useStateRef from "./useStateRef"

/**
 * This state/ref variable will update to the value passed to it if it changed, while also
 * having access to the value through a react ref. It's useful for when the state/ref
 * value also needs to track an external value.
 */
function useUpdatingStateRef<T>(
	getter: (currentValue?: T) => T,
	deps: DependencyList
): [Readonly<MutableRefObject<T>>, Dispatch<SetStateAction<T>>, T]
function useUpdatingStateRef<T>(
	value: T
): [Readonly<MutableRefObject<T>>, Dispatch<SetStateAction<T>>, T]

function useUpdatingStateRef<T>(
	valueOrGetter: (T & Exclude<T, Function>) | ((currentValue?: T) => T),
	deps?: DependencyList
) {
	const state = useStateRef(valueOrGetter)

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

export default useUpdatingStateRef
