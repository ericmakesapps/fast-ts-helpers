/** Automatically prevent the default of an event. */
function preventDefault(event: { preventDefault: () => void }) {
	event.preventDefault()
}

export default preventDefault
