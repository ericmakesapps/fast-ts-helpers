import { useCallback, useRef } from "react"

import { tuple } from "./tuple"
import { ReadonlyRefObject } from "./Types"

export function useSessionRef<T>(
	name: string
): [ReadonlyRefObject<T | undefined>, (newValue: T | undefined) => void]
export function useSessionRef<T>(
	name: string,
	defaultValue: T
): [ReadonlyRefObject<T>, (newValue: T) => void]

export function useSessionRef<T>(name: string, defaultValue?: T) {
	let fromSession: T | undefined

	const initialized = useRef(false)

	if (!initialized.current) {
		initialized.current = true

		const loaded = sessionStorage.getItem(name)

		if (loaded != null) {
			fromSession = JSON.parse(loaded) as T
		}
	}

	const value = useRef(fromSession ?? defaultValue)

	return tuple(
		value,
		useCallback(
			(newValue: T) => {
				if (value.current !== newValue) {
					sessionStorage.setItem(name, JSON.stringify(newValue))

					value.current = newValue
				}
			},
			[name]
		)
	)
}
