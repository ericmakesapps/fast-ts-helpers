import ReadonlyRefObject from "./ReadonlyRefObject"
import Storage from "./Storage"
import useBackedRef from "./useBackedRef"

/**
 * Store a ref that is backed by local storage to be persistent.
 *
 * @param name The name under which to store the parameter. This value should be unique across the app for this one component/page. Don’t use it across components/pages to try to share the value updates. That probably won’t work.
 * @param defaultValue The default value, if any, of the parameter.
 */
function useLocalStorageRef<T>(
	name: string,
	defaultValue: T
): [ReadonlyRefObject<T>, (newValue: T) => void]
function useLocalStorageRef<T>(
	name: string,
	defaultValue?: T
): [ReadonlyRefObject<T | undefined>, (newValue: T | undefined) => void]

function useLocalStorageRef<T>(name: string, defaultValue?: T) {
	return useBackedRef<T>(
		(newValue) => Storage.set(name, newValue),
		[name],
		() => Storage.get<T>(name),
		defaultValue
	)
}

export default useLocalStorageRef
