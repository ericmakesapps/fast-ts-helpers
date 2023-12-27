import { DependencyList, useEffect, useMemo, useState } from "react"

import cacheKey from "./cacheKey"
import ifBrowser from "./ifBrowser"
import throttle from "./throttle"

declare const require: (thing: string) => unknown

type MutationObserverConstructor = typeof MutationObserver

const MyMutationObserver =
	typeof MutationObserver !== "undefined"
		? MutationObserver
		: ifBrowser(
				() => require(`mutation-observer`) as MutationObserverConstructor,
				undefined
			)

/**
 * Calls a function when this component mounts, and any time changes falling under the passed options happen to the element to which the ref as attached.
 *
 * @param callback The function that will be called.
 * @param deps The dependencies of the function (for caching).
 * @param options The options to use for the observation.
 * @returns The ref callback to attach to the component to observe.
 */
function useObserve(
	callback: MutationCallback,
	deps: DependencyList,
	options: MutationObserverInit
) {
	const [node, setNode] = useState<Node | null>(null)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const cb = useMemo(() => throttle(callback), deps)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const opt = useMemo(() => options, [cacheKey(options)])

	useEffect(() => {
		if (node && MyMutationObserver) {
			const observer = new MyMutationObserver(cb)

			cb([], observer)

			observer.observe(node, opt)

			return () => observer.disconnect()
		}

		return undefined
	}, [cb, node, opt])

	return setNode as (node: Node | null) => void
}

export default useObserve
