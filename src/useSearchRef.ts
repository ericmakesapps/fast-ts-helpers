/* eslint-disable no-restricted-globals */

import { ReadonlyRefObject } from "./ReadonlyRefObject"
import { useBackedRef } from "./useBackedRef"

/**
 * Use a ref backed by a search parameter in the path.
 *
 * @param name The name under which to store the parameter. This value should be unique across the app for this one component/page. Don’t use it across components/pages to try to share the value updates. That probably won’t work.
 * @param defaultValue The default value, if any, of the parameter.
 * @requires history Must be called in a router context.
 */
export function useSearchRef<T>(
	name: string,
	defaultValue: T
): [ReadonlyRefObject<T>, (newValue: T) => void]
export function useSearchRef<T>(
	name: string,
	defaultValue?: T
): [ReadonlyRefObject<T | undefined>, (newValue: T | undefined) => void]

export function useSearchRef<T>(name: string, defaultValue?: T) {
	return useBackedRef<T>(
		(newValue) => {
			const stringified = JSON.stringify(newValue)
			const url = new URL(location.href)

			if (stringified != null) {
				url.searchParams.set(name, stringified)
			} else {
				url.searchParams.delete(name)
			}

			history.replaceState(history.state, "", url)
		},
		[history, name],
		() => {
			const stringified = new URLSearchParams(location.search).get(name)

			if (stringified != null) {
				try {
					return JSON.parse(stringified) as T
				} catch {}
			}

			return undefined
		},
		defaultValue
	)
}
