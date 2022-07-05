import { useEffect, useRef, useState } from "react"
import { useConstructor } from "./useConstructor"

const query = "(prefers-color-scheme: dark)"

/**
 * Check whether the browser is preferring dark mode right now. Updates according to the browser preference.
 *
 * @returns Whether the browser currently prefers dark mode
 */
export function isDark() {
	if (!window.matchMedia) {
		return false
	}

	const initial = useRef(false)

	useConstructor(() => {
		initial.current = window.matchMedia(query).matches
	})

	const [isDark, setIsDark] = useState(initial.current)

	useEffect(() => {
		const queryList = window.matchMedia(query)
		const listener = (event: MediaQueryListEvent) => {
			setIsDark(event.matches)
		}

		queryList.addEventListener("change", listener)

		return () => {
			queryList.removeEventListener("change", listener)
		}
	}, [])

	return isDark
}
