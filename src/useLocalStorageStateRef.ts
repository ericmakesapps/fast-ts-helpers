import { Dispatch, MutableRefObject, SetStateAction, useCallback, useRef } from "react"

import isCallable from "./isCallable"
import useLocalStorageState from "./useLocalStorageState"

/**
 * Get a state value that is backed by local storage (to be persistent) that also has a ref pointing to the current value. The setter callback will set both the state, update the local storage, and update the ref.
 *
 * @param name The name under which to store the parameter. This value should be unique across the app for this one component/page. Don’t use it across components/pages to try to share the value updates. That won’t work.
 * @param initialValue The initial value, if any, of the parameter.
 */
function useLocalStorageStateRef<T>(
	name: string,
	initialValue: T | (() => T)
): [Readonly<MutableRefObject<T>>, Dispatch<SetStateAction<T>>, T]
function useLocalStorageStateRef<T>(
	name: string,
	initialValue?: T | (() => T | undefined) | undefined
): [
	Readonly<MutableRefObject<T | undefined>>,
	Dispatch<SetStateAction<T | undefined>>,
	T | undefined
]

function useLocalStorageStateRef<T>(name: string, initialValue?: T | (() => T)) {
	const [state, setState] = useLocalStorageState(name, initialValue)
	const ref = useRef(state)

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
			[setState]
		),
		state
	]
}

export default useLocalStorageStateRef
