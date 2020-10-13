import { flatfilter } from "./flatfilter"
import { FalsibleList } from "./FalsibleList"

/** Concatenate the passed URL parts into one URL using `/` as the separator, with a leadin slash and without a trailing slash. */
export function concatUrls(...urls: FalsibleList<string>[]) {
	const filtered = flatfilter(urls)
	let protocol = ``

	const first = filtered[0]

	if (Boolean(first) && /^https?:\/\//.test(first)) {
		protocol = /^https?:\//.exec(first)![0]
		filtered[0] = first.replace(/^https?:\/\//, ``)
	}

	return (
		protocol +
		(filtered.length > 0
			? `/${filtered.join(`/`).replace(/^\/+|\/+$|\/+(\/)/g, `$1`)}`
			: ``)
	)
}
