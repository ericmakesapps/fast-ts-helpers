import {
	DependencyList,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
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
function useStateWithCallback<T>(
	initialValue: T | (() => T),
	callback: (value: T) => void,
	deps: DependencyList
): [(value: SetStateAction<T>, callback?: (value: T) => void) => void, T]
function useStateWithCallback<T>(
	initialValue: T | (() => T)
): [(value: SetStateAction<T>, callback?: (value: T) => void) => void, T]
function useStateWithCallback<T>(
	initialState?: T | (() => T | undefined) | undefined
): [
	(
		value: SetStateAction<T | undefined>,
		callback?: (value: T | undefined) => void
	) => void,
	T | undefined
]
function useStateWithCallback<T>(
	initialState?: T | (() => T | undefined) | undefined
): [
	(
		value: SetStateAction<T | undefined>,
		callback?: (value: T | undefined) => void
	) => void,
	T | undefined
]

function useStateWithCallback<T>(
	initialState?: T | (() => T),
	callback?: (value: T | undefined) => void,
	deps?: DependencyList
) {
	const initialized = useRef(false)
	const [state, setState] = useState(initialState)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const cb = useMemo(() => callback, deps ?? [])
	const callbacks = useRef<[T | undefined, (value: T | undefined) => void][]>([])

	useEffect(() => {
		if (!initialized.current) {
			initialized.current = true
		} else {
			cb?.(state)

			for (const [i, cb] of Array.from(callbacks.current.entries()).reverse()) {
				// If the state is what we expect, call the callback and remove it from the list.
				if (state === cb[0]) {
					cb[1](state)
					callbacks.current.splice(i, 1)
				}
			}
		}
	}, [cb, state])

	return [
		useCallback<
			(value: SetStateAction<T | undefined>, cb?: (value: T | undefined) => void) => void
		>((valueOrFunction, callback) => {
			setState((currentValue) => {
				const value = isCallable(valueOrFunction)
					? valueOrFunction(currentValue)
					: valueOrFunction

				if (callback) {
					if (currentValue === value) {
						callback(value)
					} else {
						callbacks.current.push([value, callback])
					}
				}

				return value
			})
		}, []),
		state
	]
}

export default useStateWithCallback
