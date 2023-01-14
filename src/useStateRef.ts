import {
	Dispatch,
	MutableRefObject,
	SetStateAction,
	useCallback,
	useRef,
	useState
} from "react"

import tuple from "./tuple"
import isCallable from "./isCallable"

/**
 * Get a ref and state value for a given value. The callback that is returned sets both the ref and state.
 *
 * @param defaultValue The default value of the state/ref.
 * @returns A tuple containing the ref, the setter, and the state values.
 */
function useStateRef<T>(
	defaultValue: T
): [Readonly<MutableRefObject<T>>, Dispatch<SetStateAction<T>>, T]
function useStateRef<T>(
	defaultValue?: T
): [
	Readonly<MutableRefObject<T | undefined>>,
	Dispatch<SetStateAction<T | undefined>>,
	T | undefined
]

function useStateRef<T>(defaultValue?: T) {
	const ref = useRef(defaultValue)
	const [state, setState] = useState(defaultValue)

	return tuple(
		ref as Readonly<typeof ref>,
		useCallback<typeof setState>((valueOrFunction) => {
			if (isCallable(valueOrFunction)) {
				setState((currentValue) => {
					const value = valueOrFunction(currentValue)

					ref.current = value

					return value
				})
			} else {
				ref.current = valueOrFunction

				setState(valueOrFunction)
			}
		}, []),
		state
	)
}

export default useStateRef
