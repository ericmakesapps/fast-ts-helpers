import { DependencyList, useEffect, useMemo, useState } from "react"

import { throttle } from "./throttle"
import { cacheKey } from "./cacheKey"

declare const require: (thing: string) => unknown

const MutationObserver = require(`mutation-observer`) as {
	prototype: MutationObserver
	new (callback: MutationCallback): MutationObserver
}

/**
 * Calls a function when this component mounts, and any time changes falling under the passed options happen to the element to which the ref as attached.
 *
 * @param callback The function that will be called.
 * @param deps The dependencies of the function (for caching).
 * @param options The options to use for the observation.
 * @returns The ref callback to attach to the component to observe.
 */
export function useObserve(
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
		if (node) {
			const observer = new MutationObserver(cb)

			cb([], observer)

			observer.observe(node, opt)

			return () => observer.disconnect()
		}

		return undefined
	}, [cb, node, opt])

	return setNode as (node: Node | null) => void
}
