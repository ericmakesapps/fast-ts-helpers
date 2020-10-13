import { storage } from "./storage"
import { useBackedState } from "./useBackedState"

/**
 * Store a state that is backed by local storage to be persistent.
 *
 * @param name The name under which to store the parameter.
 * @param defaultValue The default value, if any, of the parameter.
 */
export function useLocalStorageState<T>(
	name: string,
	defaultValue: T
): [T, (newValue: T) => void]
export function useLocalStorageState<T>(
	name: string,
	defaultValue?: T
): [T | undefined, (newValue: T | undefined) => void]

export function useLocalStorageState<T>(name: string, defaultValue?: T) {
	return useBackedState<T>(
		(newValue) => storage.set(name, newValue),
		[name],
		() => storage.get<T>(name),
		defaultValue
	)
}
