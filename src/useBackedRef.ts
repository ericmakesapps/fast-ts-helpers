import { DependencyList, useCallback, useMemo, useRef } from "react"

import areEqual from "./areEqual"
import ReadonlyRefObject from "./ReadonlyRefObject"
import tuple from "./tuple"

/**
 * Use a ref that has some backing for its initial value.
 *
 * @param set A callback to set the value in the backing. This is used each time the setter is called.
 * @param deps The dependency list for the set callback.
 * @param get A callback to get the initial value from backing. This is only used in initializing this ref.
 * @param defaultValue The default value to use for the value.
 */
function useBackedRef<T>(
	set: (newValue: T) => void,
	deps: DependencyList,
	get: () => T,
	defaultValue: T
): [ReadonlyRefObject<T>, (newValue: T) => void]
function useBackedRef<T>(
	set: (newValue: T | undefined) => void,
	deps: DependencyList,
	get: () => T | undefined,
	defaultValue?: T
): [ReadonlyRefObject<T | undefined>, (newValue: T | undefined) => void]

function useBackedRef<T>(
	set: (newValue: T | undefined) => void,
	deps: DependencyList,
	get: () => T | undefined,
	defaultValue?: T
) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const value = useRef(useMemo(get, []) ?? defaultValue)

	return tuple(
		value,
		useCallback(
			(newValue: T) => {
				if (!areEqual(value.current, newValue)) {
					value.current = newValue
					set(newValue)
				}
			},
			// eslint-disable-next-line react-hooks/exhaustive-deps
			deps
		)
	)
}

export default useBackedRef
