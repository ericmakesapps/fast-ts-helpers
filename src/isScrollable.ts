/** Whether the passed element is scrollable. */
function isScrollable(element: HTMLElement) {
	const style = window.getComputedStyle(element)

	return (
		style.overflowY === `auto` ||
		style.overflowY === `scroll` ||
		style.overflowX === `auto` ||
		style.overflowX === `scroll`
	)
}

export default isScrollable
