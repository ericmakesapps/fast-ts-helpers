import { Dispatch, SetStateAction, useCallback } from "react"

import Storage from "./Storage"
import isCallable from "./isCallable"

function useOutbox<T>(box: string, defaultValue: T): Dispatch<SetStateAction<T>>
function useOutbox<T>(
	box: string,
	defaultValue?: T
): Dispatch<SetStateAction<T | undefined>>

function useOutbox<T>(box: string, defaultValue: T) {
	if (defaultValue != null && !Storage.has(box)) {
		Storage.set(box, defaultValue)
	}

	return useCallback<Dispatch<SetStateAction<T | undefined>>>(
		(valueOrFactory) => {
			const newValue = isCallable(valueOrFactory)
				? valueOrFactory(Storage.get(box))
				: valueOrFactory

			Storage.set(box, newValue)
		},
		[box]
	)
}

export default useOutbox
