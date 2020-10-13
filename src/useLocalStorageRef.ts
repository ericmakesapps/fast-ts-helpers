import { storage } from "./storage"
import { ReadonlyRefObject } from "./ReadonlyRefObject"
import { useBackedRef } from "./useBackedRef"

/**
 * Store a ref that is backed by local storage to be persistent.
 *
 * @param name The name under which to store the parameter.
 * @param defaultValue The default value, if any, of the parameter.
 */
export function useLocalStorageRef<T>(
	name: string,
	defaultValue: T
): [ReadonlyRefObject<T>, (newValue: T) => void]
export function useLocalStorageRef<T>(
	name: string,
	defaultValue?: T
): [ReadonlyRefObject<T | undefined>, (newValue: T | undefined) => void]

export function useLocalStorageRef<T>(name: string, defaultValue?: T) {
	return useBackedRef<T>(
		(newValue) => storage.set(name, newValue),
		[name],
		() => storage.get<T>(name),
		defaultValue
	)
}
