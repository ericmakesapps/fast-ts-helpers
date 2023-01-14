import ReadonlyRefObject from "./ReadonlyRefObject"
import useBackedRef from "./useBackedRef"

/**
 * Use a ref variable backed by session storage. This is designed only for local access to the variable value (not across different components/environments).
 *
 * @param name The name under which to store the variable. This value should be unique across the app for this one component/page. Don’t use it across components/pages to try to share the value updates. That probably won’t work.
 * @param defaultValue The default value, if any, of the value.
 */
function useSessionRef<T>(
	name: string,
	defaultValue: T
): [ReadonlyRefObject<T>, (newValue: T) => void]
function useSessionRef<T>(
	name: string,
	defaultValue?: T
): [ReadonlyRefObject<T | undefined>, (newValue: T | undefined) => void]

function useSessionRef<T>(name: string, defaultValue?: T) {
	return useBackedRef<T>(
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

export default useSessionRef
