/** Get the total offset left of the passed element. */
export function totalOffsetLeft(element: HTMLElement | null): number {
	let offset = 0

	while (element) {
		offset += element.offsetLeft
		element = element.offsetParent as HTMLElement | null
	}

	return offset
}
