import { useMemo, useRef, useState } from "react"

import areEqual from "./areEqual"
import tuple from "./tuple"
import useOnUnmount from "./useOnUnmount"

type LoadedData<T> = [
	data: T,
	setData: React.Dispatch<React.SetStateAction<T>>,
	promise: PromiseLike<T>,
	loading: false,
	abortController: AbortController
]
type LoadingData<T> = [
	data: T | undefined,
	setData: React.Dispatch<React.SetStateAction<T>>,
	promise: PromiseLike<T>,
	loading: true,
	abortController: AbortController
]

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
function useAwait<T>(
	callback: (
		abortSignal: AbortSignal,
		abortController: AbortController
	) => [T, PromiseLike<T>],
	deps?: React.DependencyList
): LoadedData<T>

function useAwait<T>(
	callback: (
		abortSignal: AbortSignal,
		abortController: AbortController
	) => PromiseLike<T>,
	deps?: React.DependencyList
): LoadingData<T> | LoadedData<T>

function useAwait<T>(
	callback: (
		abortSignal: AbortSignal,
		abortController: AbortController
	) => PromiseLike<T> | [T, PromiseLike<T>],
	deps: React.DependencyList = []
): any {
	const [loading, setLoading] = useState(true)

	// Create a ref for the abort controller. This is to allow cancelling externally.
	const abortControllerRef = useRef<AbortController>()

	// When the component gets unmounted, cancel any in-flight requests
	useOnUnmount(() => abortControllerRef.current?.abort("Component unmounted"))

	const [cached, promise] = useMemo(() => {
		// Any time we call process a new request, we cancel the previous one
		abortControllerRef.current?.abort("New request superseded")

		// Create a new abort controller for this request
		const abortController = new AbortController()

		// Save the abort controller to the ruf
		abortControllerRef.current = abortController

		// Set the loading state for any loading rendering in the consumer
		setLoading(true)

		// This will either be a promise, or a tuple with a cached value and promise
		const promiseOrCacheAndPromise = callback(abortController.signal, abortController)

		const [cached, promise] = Array.isArray(promiseOrCacheAndPromise)
			? promiseOrCacheAndPromise
			: [undefined, promiseOrCacheAndPromise]

		return [
			cached,
			promise.then((fetched) => {
				if (!abortController.signal.aborted) {
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

	return tuple(data, setData, promise, loading, abortControllerRef.current)
}

export default useAwait
