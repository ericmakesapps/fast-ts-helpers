import { useEffect, useMemo, useRef, useState } from "react"

import areEqual from "./areEqual"
import tuple from "./tuple"
import useConstructor from "./useConstructor"
import usePrevious from "./usePrevious"

/**
 * Use a state that is initialized asynchronously, potentially with a cached value.
 *
 * @param callback The callback that returns the promise or a tuple with the cached value
 *   and an update promise.
 * @param deps The dependencies that will trigger a re-fetch if they change. If this is
 *   passed, changes will cause a refetch. If not, this will only be fetched once.
 * @returns A tuple containing the current value, a setter to change the value at a later
 *   time, the underlying promise, and whether we are currently loading a new result.
 */
export default function useAwait<T>(
	callback: () => PromiseLike<T> | [T, PromiseLike<T>],
	deps: React.DependencyList = []
) {
	const [loading, setLoading] = useState(true)

	const [cached, fetch] = useMemo(() => {
		setLoading(true)

		const promiseOrCacheAndPromise = callback()

		return Array.isArray(promiseOrCacheAndPromise)
			? promiseOrCacheAndPromise
			: [undefined, promiseOrCacheAndPromise]
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps)

	const [data, setData] = useState(cached)

	// Do the first fetch immediately
	useConstructor(async () => {
		const fetchedValue = await fetch

		if (!areEqual(cached, fetchedValue)) {
			setData(fetchedValue)
		}
	})

	// Record what the first promise was so we don't await it more than once
	const initialPromise = useRef(fetch)

	// Do future fetches if the dependencies change (which will change the promise)
	useEffect(() => {
		if (initialPromise.current !== fetch) {
			const doFetch = async () => {
				const fetchedValue = await fetch

				if (!areEqual(cached, fetchedValue)) {
					setData(fetchedValue)
				}
			}

			void doFetch()
		}
	}, [cached, fetch])

	if (data !== usePrevious(data) && loading) {
		setTimeout(() => setLoading(false), 0)
	}

	return tuple(data, setData, fetch, loading)
}
