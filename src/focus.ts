import { focusableSelector } from "./Constants"
import { Falsible } from "./Types"

/**
 * Transfer the focus to an element, optionally preventing scrolling. You can use this to focus on elements that aren't actually focusable too, for accessibility.
 *
 * @param element The element to focus.
 * @param preventScroll Whether scrolling should be prevented. Defaults to `true`.
 */
export function focus(element: Falsible<HTMLElement | SVGElement>, preventScroll = true) {
	if (!Boolean(element)) {
		return
	}

	const selectable = element.matches(focusableSelector)

	if (!selectable && !element.hasAttribute(`tabindex`)) {
		element.setAttribute(`tabindex`, `-1`)
	}

	const { scrollX, scrollY } = window

	element.focus({
		preventScroll
	})

	if (preventScroll && (window.scrollY !== scrollY || window.scrollX !== scrollX)) {
		window.scrollTo(scrollX, scrollY)
	}
}
