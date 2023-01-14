/** Get the total offset left of the passed element. */
function totalOffsetLeft(element: HTMLElement | null): number {
	let offset = 0

	while (element) {
		offset += element.offsetLeft
		element = element.offsetParent as HTMLElement | null
	}

	return offset
}

export default totalOffsetLeft
