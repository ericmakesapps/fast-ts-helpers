import { useMemo, useState } from "react"

import areEqual from "./areEqual"
import tuple from "./tuple"
import useMountedRef from "./useMountedRef"

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
	const mounted = useMountedRef()

	const [cached, promise] = useMemo(() => {
		setLoading(true)

		const promiseOrCacheAndPromise = callback()

		const [cached, promise] = Array.isArray(promiseOrCacheAndPromise)
			? promiseOrCacheAndPromise
			: [undefined, promiseOrCacheAndPromise]

		return [
			cached,
			promise.then((fetched) => {
				if (mounted.current) {
					setLoading(false)

					if (!areEqual(cached, fetched)) {
						setData(fetched)
					}
				}

				return fetched
			})
		]
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps)

	const [data, setData] = useState(cached)

	return tuple(data, setData, promise, loading)
}
