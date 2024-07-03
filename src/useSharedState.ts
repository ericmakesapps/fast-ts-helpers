import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"

import useConstructor from "./useConstructor"

const subscribers: Record<
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
		name in subscribers ? subscribers[name].value : initialValue
	)

	const init = useCallback(() => {
		if (!subscribers[name]) {
			subscribers[name] = {
				value: value,
				setters: new Set([_setValue])
			}
		} else {
			subscribers[name].setters.add(_setValue)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name])

	useConstructor(init)

	useEffect(() => {
		init()

		return () => {
			// On unmount or name changes, remove the setter from the list of setters.
			subscribers[name].setters.delete(_setValue)

			// If there's no more setters, delete the subscriber.
			if (subscribers[name].setters.size === 0) {
				delete subscribers[name]
			}
		}
	}, [init, name])

	return [
		value,
		useCallback(
			(newValue: T) => {
				subscribers[name].value = newValue

				for (const setValue of subscribers[name].setters) {
					setValue(newValue)
				}
			},
			[name]
		)
	]
}

export default useSharedState
