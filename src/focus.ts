import Falsible from "./Falsible"
import focusableSelector from "./focusableSelector"
import truthy from "./truthy"

/**
 * Transfer the focus to an element, optionally preventing scrolling. You can use this to focus on elements that aren't actually focusable too, for accessibility.
 *
 * @param element The element to focus.
 * @param preventScroll Whether scrolling should be prevented. Defaults to `true`.
 */
function focus(element: Falsible<HTMLElement | SVGElement>, preventScroll = true) {
	if (!truthy(element)) {
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

export default focus
