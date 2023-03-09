import {
	Dispatch,
	MutableRefObject,
	SetStateAction,
	useCallback,
	useRef,
	useState
} from "react"

import isCallable from "./isCallable"

/**
 * Get a ref and state value for a given value. The callback that is returned sets both the ref and state.
 *
 * @param initialValue The initial value of the state/ref.
 * @returns A tuple containing the ref, the setter, and the state values.
 */
function useStateRef<T>(
	initialValue: T | (() => T)
): [Readonly<MutableRefObject<T>>, Dispatch<SetStateAction<T>>, T]
function useStateRef<T>(
	initialState?: T | (() => T | undefined) | undefined
): [
	Readonly<MutableRefObject<T | undefined>>,
	Dispatch<SetStateAction<T | undefined>>,
	T | undefined
]

function useStateRef<T>(initialState?: T | (() => T)) {
	const [state, setState] = useState(initialState)
	const ref = useRef(state)

	return [
		ref,
		useCallback<typeof setState>((valueOrFunction) => {
			setState(
				isCallable(valueOrFunction)
					? (currentValue) => (ref.current = valueOrFunction(currentValue))
					: (ref.current = valueOrFunction)
			)
		}, []),
		state
	]
}

export default useStateRef
