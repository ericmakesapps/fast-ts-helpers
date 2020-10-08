/**
 * Return a sibling from the passed element by count away from the element.
 *
 * @param element The element whose nth sibling shuold be returned.
 * @param n The element count from the current element. Passing `0` will return the element itself.
 * @returns The sibling that is `n` away from the passed element.
 */
export function getNthSibling(element: HTMLElement | undefined, n: number) {
	n = Math.round(n)

	while (n !== 0) {
		if (!element) {
			break
		}

		element = (n > 0 ? element.nextElementSibling : element.previousElementSibling) as
			| HTMLElement
			| undefined
		n += n > 0 ? -1 : 1
	}

	return element
}
