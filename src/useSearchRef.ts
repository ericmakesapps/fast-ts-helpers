import { useHistory } from "react-router"

import { ReadonlyRefObject } from "./ReadonlyRefObject"
import { useBackedRef } from "./useBackedRef"

/**
 * Use a ref backed by a search parameter in the path.
 *
 * @param name The name under which to store the parameter.
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
	const history = useHistory()

	return useBackedRef<T>(
		(newValue) => {
			const stringified = JSON.stringify(newValue)
			const params = new URLSearchParams(history.location.search)

			if (stringified != null) {
				params.set(name, stringified)
			} else {
				params.delete(name)
			}

			history.replace({
				...history.location,
				search: params.toString()
			})
		},
		[history, name],
		() => {
			const stringified = new URLSearchParams(history.location.search).get(name)

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
