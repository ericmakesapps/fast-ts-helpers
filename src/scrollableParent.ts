import { isScrollable } from "./isScrollable"

/**
 * Get the nearest scrollable parent of the passed element, if one exists.
 *
 * @param element The element whose scrollable parent to get.
 * @returns The nearest scrollable parent of the passed element, if one exists.
 */
export function scrollableParent(element: HTMLElement) {
	let parent = element.parentElement

	while (parent && !isScrollable(parent)) {
		parent = parent.parentElement
	}

	return parent ?? undefined
}
