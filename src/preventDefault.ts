/** Automatically prevent the default of an event. */
export function preventDefault(event: { preventDefault: () => void }) {
	event.preventDefault()
}
