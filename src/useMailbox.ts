import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useState
} from "react"

import Storage from "./Storage"
import areEqual from "./areEqual"
import tuple from "./tuple"
import isCallable from "./isCallable"

/** Use a state variable that is stored in localStorage as well, such that other contexts at the same host can change the value. This polls every 100 millis for a value change. */
function useMailbox<T>(box: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>]
function useMailbox<T>(
	box: string,
	defaultValue?: undefined
): [T | undefined, Dispatch<SetStateAction<T | undefined>>]

function useMailbox<T>(box: string, defaultValue?: T) {
	const [value, setValue] = useState(
		useMemo(() => Storage.get<T>(box), [box]) ?? defaultValue
	)

	if (defaultValue != null && !Storage.has(box)) {
		Storage.set(box, defaultValue)
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setValue((value) => {
				const newValue = Storage.get<T>(box)

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

						Storage.set(box, newValue)

						return newValue
					})
				} else {
					Storage.set(box, valueOrFactory)

					setValue(valueOrFactory)
				}
			},
			[box]
		)
	)
}

export default useMailbox
