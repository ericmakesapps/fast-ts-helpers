import { Dispatch, MutableRefObject, SetStateAction, useCallback, useRef } from "react"

import { isCallable } from "./isCallable"
import { tuple } from "./tuple"
import { useSessionState } from "./useSessionState"

/**
 * Get a state value that is backed by session storage (to be persistent) that also has a ref pointing to the current value. The setter callback will set both the state, update the session storage, and update the ref.
 *
 * @param name The name under which to store the parameter. This value should be unique across the app for this one component/page. Don’t use it across components/pages to try to share the value updates. That probably won’t work.
 * @param defaultValue The default value, if any, of the parameter.
 */
export function useSessionStateRef<T>(
	name: string,
	defaultValue: T
): [Readonly<MutableRefObject<T>>, Dispatch<SetStateAction<T>>, T]
export function useSessionStateRef<T>(
	name: string,
	defaultValue?: T
): [
	Readonly<MutableRefObject<T | undefined>>,
	Dispatch<SetStateAction<T | undefined>>,
	T | undefined
]

export function useSessionStateRef<T>(name: string, defaultValue?: T) {
	const ref = useRef(defaultValue)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const [state, setState] = useSessionState(name, defaultValue)

	return tuple(
		ref as Readonly<typeof ref>,
		useCallback<typeof setState>(
			(valueOrFunction) => {
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
			},
			[setState]
		),
		state
	)
}
