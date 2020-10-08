import { totalOffsetTop } from "./totalOffsetTop"

/** Get how many pixel offset from the top of its parent the passed element is. */
export function parentTop(element: HTMLElement) {
	const offset = totalOffsetTop(element)

	if (!element.parentElement) {
		return offset
	}

	return offset - totalOffsetTop(element.parentElement)
}
