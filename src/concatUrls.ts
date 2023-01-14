import FalsibleList from "./FalsibleList"
import filter from "./filter"
import flat from "./flat"

/** Concatenate the passed URL parts into one URL using `/` as the separator, with a leadin slash and without a trailing slash. */
function concatUrls(...urls: FalsibleList<string>[]) {
	const filtered = filter(flat(urls))

	if (filtered.length > 0) {
		let protocol = ``
		const first = filtered[0]

		if (/^https?:\/\//.test(first)) {
			protocol = /^.+?:\/(?=\/)/.exec(first)![0]
			filtered[0] = first.replace(/^.+?:\/\//, ``)
		}

		return `${protocol}/${filtered.join(`/`).replace(/^\/+|\/+$|\/+(\/)/g, `$1`)}`
	}

	return ``
}

export default concatUrls
