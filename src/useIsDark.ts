import { useEffect, useState } from "react"
import { ifBrowser } from "./ifBrowser"

const query = ifBrowser(
	() => window.matchMedia?.(`(prefers-color-scheme: dark)`),
	undefined
)

/**
 * Check whether the browser is preferring dark mode right now. Updates according to the browser preference.
 *
 * @returns Whether the browser currently prefers dark mode
 */
export function useIsDark() {
	const [isDark, setIsDark] = useState(() => query?.matches)

	useEffect(() => {
		const listener = (event: MediaQueryListEvent) => {
			setIsDark(event.matches)
		}

		query?.addEventListener(`change`, listener)

		return () => {
			query?.removeEventListener(`change`, listener)
		}
	}, [])

	return isDark
}
