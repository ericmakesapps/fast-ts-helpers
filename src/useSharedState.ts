import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"

import useConstructor from "./useConstructor"

/** Internal record of subscribers. This may be removed at any time. */
export const __subscribers: Record<
	string,
	{
		value: any
		setters: Set<Dispatch<any>>
	}
> = {}

/**
 * Use a state that is shared between local components by name. This allows multiple
 *   components to track and/or update a state value without having to pass the value and
 *   setter around and down the component tree.
 */
function useSharedState<T>(
	name: string,
	initialValue: T | (() => T)
): [T, Dispatch<SetStateAction<T>>]
function useSharedState<T>(
	name: string,
	initialValue?: T | (() => T | undefined) | undefined
): [T | undefined, Dispatch<SetStateAction<T | undefined>>]

function useSharedState<T>(name: string, initialValue?: T | (() => T)) {
	const [value, _setValue] = useState(
		name in __subscribers ? __subscribers[name].value : initialValue
	)

	const init = useCallback(() => {
		if (!__subscribers[name]) {
			__subscribers[name] = {
				value: value,
				setters: new Set([_setValue])
			}
		} else {
			__subscribers[name].setters.add(_setValue)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name])

	useConstructor(init)

	useEffect(() => {
		init()

		return () => {
			// On unmount or name changes, remove the setter from the list of setters.
			__subscribers[name].setters.delete(_setValue)

			// If there's no more setters, delete the subscriber.
			if (__subscribers[name].setters.size === 0) {
				delete __subscribers[name]
			}
		}
	}, [init, name])

	return [
		value,
		useCallback(
			(newValue: T) => {
				__subscribers[name].value = newValue

				for (const setValue of __subscribers[name].setters) {
					setValue(newValue)
				}
			},
			[name]
		)
	]
}

export default useSharedState
