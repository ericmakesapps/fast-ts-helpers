import { useCallback, useMemo, useState } from "react"
import { storage } from "./Storage"
import { tuple } from "./tuple"
import { isCallable } from "./isCallable"

/** Use a state value that checks and updates localStorage with the value to make it persist across page refreshes. */
export function usePersistentState<T>(key: string, defaultValue: T) {
	const [value, setValue] = useState(
		useMemo(() => storage.get<T>(key), [key]) ?? defaultValue
	)

	return tuple(
		value,
		useCallback<typeof setValue>(
			(valueOrGetter) => {
				if (isCallable(valueOrGetter)) {
					setValue((value) => {
						const newValue = valueOrGetter(value)

						storage.set(key, newValue)

						return newValue
					})
				} else {
					storage.set(key, valueOrGetter)

					setValue(valueOrGetter)
				}
			},
			[key]
		)
	)
}
