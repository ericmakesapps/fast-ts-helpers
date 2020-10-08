import { parentLeft } from "./parentLeft"
import { parentTop } from "./parentTop"
import { isScrollable } from "./isScrollable"
import { animateScrollTo } from "./animateScrollTo"

/**
 * Scroll the passed element into view if it is not currently in the view.
 *
 * @param element The element to scroll.
 * @param options An object container some possible options.
 * @returns A promise that resolves when scrolling is done.
 */
export async function scrollIntoViewIfNeeded(
	element: HTMLElement,
	{
		padding = 0,
		direction = `both`
	}: {
		padding?: number
		direction?: `both` | `horizontal` | `vertical`
	} = {}
) {
	type Scroller = {
		element: HTMLElement
		viewport: {
			width: number
			height: number
		}

		scrollLeft: number
		offsetLeft: number
		width: number

		scrollTop: number
		offsetTop: number
		height: number
	}

	const scrollers: Scroller[] = []

	for (
		let curr = element, child = element, offsetTop = 0, offsetLeft = 0;
		curr.parentElement;
		curr = curr.parentElement
	) {
		offsetTop += parentTop(curr)
		offsetLeft += parentLeft(curr)

		if (isScrollable(curr.parentElement)) {
			scrollers.push({
				element: curr.parentElement,
				viewport: {
					width: curr.parentElement.clientWidth,
					height: curr.parentElement.clientHeight
				},

				scrollLeft: curr.parentElement.scrollLeft,
				offsetLeft,
				width: child.offsetWidth,

				scrollTop: curr.parentElement.scrollTop,
				offsetTop,
				height: child.offsetHeight
			})

			offsetTop = 0
			child = curr.parentElement
		}
	}

	await Promise.all(
		scrollers.map(async (options) => {
			let scrollTop = options.scrollTop
			let scrollLeft = options.scrollLeft

			if (
				options.offsetTop + options.height >
				options.viewport.height + options.scrollTop - padding
			) {
				// Element needs scroll up into the view
				scrollTop = options.offsetTop + options.height - options.viewport.height + padding
			} else if (options.offsetTop < options.scrollTop + padding) {
				// Element needs scroll down into the view
				scrollTop = options.offsetTop - padding
			}

			if (
				options.offsetLeft + options.width >
				options.viewport.width + options.scrollLeft - padding
			) {
				// Element needs scroll left into the view
				scrollLeft = options.offsetLeft + options.width - options.viewport.width + padding
			} else if (options.offsetLeft < options.scrollLeft + padding) {
				// Element needs scroll right into the view
				scrollLeft = options.offsetLeft - padding
			}

			return animateScrollTo(options.element, {
				top: direction === `both` || direction === `vertical` ? scrollTop : undefined,
				left: direction === `both` || direction === `horizontal` ? scrollLeft : undefined
			})
		})
	)
}
