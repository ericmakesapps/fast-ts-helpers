import ifBrowser from "./ifBrowser"

/** Whether we are currently running on local host (according to the URL). */
const isLocal = ifBrowser(
	() => /localhost|127.0.0.1|0.0.0.0/.test(document.location.hostname),
	false
)

export default isLocal
