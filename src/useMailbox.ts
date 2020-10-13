import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useState
} from "react"

import { storage } from "./storage"
import { areEqual } from "./areEqual"
import { tuple } from "./tuple"
import { isCallable } from "./isCallable"

/** Use a state variable that is stored in localStorage as well, such that other contexts at the same host can change the value. This polls every 100 millis for a value change. */
export function useMailbox<T>(
	box: string,
	defaultValue: T
): [T, Dispatch<SetStateAction<T>>]
export function useMailbox<T>(
	box: string,
	defaultValue?: undefined
): [T | undefined, Dispatch<SetStateAction<T | undefined>>]

export function useMailbox<T>(box: string, defaultValue?: T) {
	const [value, setValue] = useState(
		useMemo(() => storage.get<T>(box), [box]) ?? defaultValue
	)

	if (defaultValue != null && !storage.has(box)) {
		storage.set(box, defaultValue)
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setValue((value) => {
				const newValue = storage.get<T>(box)

				if (!areEqual(value, newValue)) {
					return newValue
				}

				return value
			})
		}, 100)

		return () => clearInterval(interval)
	}, [box])

	return tuple(
		value,
		useCallback<typeof setValue>(
			(valueOrFactory) => {
				if (isCallable(valueOrFactory)) {
					setValue((value) => {
						const newValue = valueOrFactory(value)

						storage.set(box, newValue)

						return newValue
					})
				} else {
					storage.set(box, valueOrFactory)

					setValue(valueOrFactory)
				}
			},
			[box]
		)
	)
}
