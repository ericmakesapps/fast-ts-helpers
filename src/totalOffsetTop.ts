/** Get the total offset top of the passed element. */
export function totalOffsetTop(element: HTMLElement | null): number {
	let offset = 0

	while (element) {
		offset += element.offsetTop
		element = element.offsetParent as HTMLElement | null
	}

	return offset
}
