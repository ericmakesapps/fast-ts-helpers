import { useMemo, useRef, useState } from "react"

import { areEqual } from "./areEqual"
import { tuple } from "./tuple"
import { useConstructor } from "./useConstructor"

/**
 * Use a state that is initialized asynchronously, potentially with a cached value.
 *
 * @param callback The callback that returns the promise or a tuple with the cached value and an update promise.
 * @returns A tuple containing the current value, a setter to change the value at a later time, and the underlying promise
 */
export function useAwait<T>(callback: () => Promise<T> | [T, Promise<T>]) {
	const cb = useRef(callback)
	const promiseOrCacheAndPromise = useMemo(() => cb.current(), [])

	const [cached, fetch] = useMemo(() => {
		return Array.isArray(promiseOrCacheAndPromise)
			? promiseOrCacheAndPromise
			: [undefined, promiseOrCacheAndPromise]
	}, [promiseOrCacheAndPromise])

	const [data, setData] = useState(cached)

	useConstructor(async () => {
		const fetchedValue = await fetch

		if (!areEqual(cached, fetchedValue)) {
			setData(fetchedValue)
		}
	})

	return tuple(data, setData, fetch)
}
