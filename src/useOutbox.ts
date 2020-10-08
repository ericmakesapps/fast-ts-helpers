import { Dispatch, SetStateAction, useCallback } from "react"

import { storage } from "./Storage"
import { isCallable } from "./isCallable"

export function useOutbox<T>(box: string, defaultValue: T): Dispatch<SetStateAction<T>>
export function useOutbox<T>(
	box: string,
	defaultValue?: T
): Dispatch<SetStateAction<T | undefined>>

export function useOutbox<T>(box: string, defaultValue: T) {
	if (defaultValue != null && !storage.has(box)) {
		storage.set(box, defaultValue)
	}

	return useCallback<Dispatch<SetStateAction<T | undefined>>>(
		(valueOrFactory) => {
			const newValue = isCallable(valueOrFactory)
				? valueOrFactory(storage.get(box))
				: valueOrFactory

			storage.set(box, newValue)
		},
		[box]
	)
}
