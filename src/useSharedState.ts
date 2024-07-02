import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"

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

	if (!subscribers[name]) {
		subscribers[name] = {
			value: value,
			setters: new Set([_setValue])
		}
	}

	const setValue = useCallback(
		(newValue: T) => {
			subscribers[name].value = newValue

			for (const setValue of subscribers[name].setters) {
				setValue(newValue)
			}
		},
		[name]
	)

	useEffect(() => {
		return () => {
			subscribers[name].setters.delete(_setValue)

			if (subscribers[name].setters.size === 0) {
				delete subscribers[name]
			}
		}
	}, [name])

	return [value, setValue]
}

export default useSharedState
