import { SetStateAction } from "react"

import { useBackedState } from "./useBackedState"

/**
 * Use a state variable backed by session storage. This is designed only for local access to the variable value (not across different components/environments).
 *
 * @param name The name under which to store the variable.
 * @param defaultValue The default value, if any, of the value.
 */
export function useSessionState<T>(
	name: string,
	defaultValue: T
): [T, (newValue: SetStateAction<T>) => void]
export function useSessionState<T>(
	name: string,
	defaultValue?: T
): [T | undefined, (newValue: SetStateAction<T | undefined>) => void]

export function useSessionState<T>(name: string, defaultValue?: T) {
	return useBackedState<T>(
		(newValue) => {
			const stringified = JSON.stringify(newValue)

			if (stringified != null) {
				sessionStorage.setItem(name, stringified)
			} else {
				sessionStorage.removeItem(name)
			}
		},
		[name],
		() => {
			const stringified = sessionStorage.getItem(name)

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
