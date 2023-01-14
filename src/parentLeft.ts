import totalOffsetLeft from "./totalOffsetLeft"

/** Get how many pixel offset from the left of its parent the passed element is. */
function parentLeft(element: HTMLElement): number {
	const offset = totalOffsetLeft(element)

	if (!element.parentElement) {
		return offset
	}

	return offset - totalOffsetLeft(element.parentElement)
}

export default parentLeft
