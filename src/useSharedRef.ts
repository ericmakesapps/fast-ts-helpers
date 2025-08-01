import React, { useCallback, useEffect, useMemo } from "react"

import isCallable from "./isCallable"
import ReadonlyRefObject from "./ReadonlyRefObject"
import useConstructor from "./useConstructor"
import uuid from "./uuid"

const subscribers: Record<
	string,
	{
		ref: ReadonlyRefObject<any>
		ids: Set<string>
	}
> = {}

/**
 * Use a ref that is shared between local components by name. This allows multiple
 *   components to use a single ref without having to pass it around, across and down the
 *   component trees
 */
function useSharedRef<T>(
	name: string,
	initialValue: T | (() => T)
): React.MutableRefObject<T>
function useSharedRef<T>(
	name: string,
	initialValue?: T | (() => T | undefined) | undefined
): React.MutableRefObject<T | undefined>

function useSharedRef<T>(name: string, initialValue?: T | (() => T)) {
	/** The ID for this instance, for tracking active subscribers. */
	const id = useMemo(() => uuid(), [])

	const init = useCallback(() => {
		if (!subscribers[name]) {
			subscribers[name] = {
				ids: new Set([id]),
				ref: { current: isCallable(initialValue) ? initialValue() : initialValue }
			}
		} else {
			subscribers[name].ids.add(id)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, name])

	useConstructor(init)

	useEffect(() => {
		init()

		return () => {
			subscribers[name].ids.delete(id)

			if (subscribers[name].ids.size === 0) {
				delete subscribers[name]
			}
		}
	}, [id, init, name])

	return subscribers[name].ref
}

export default useSharedRef
