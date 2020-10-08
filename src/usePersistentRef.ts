import { useCallback, useMemo, useRef } from "react"

import { tuple } from "./tuple"
import { storage } from "./Storage"

export function usePersistentRef<T>(key: string, defaultValue: T) {
	const value = useRef(useMemo(() => storage.get<T>(key), [key]) ?? defaultValue)

	return tuple(
		value as Readonly<typeof value>,
		useCallback(
			(newValue: T) => {
				storage.set(key, newValue)

				value.current = newValue
			},
			[key]
		)
	)
}
