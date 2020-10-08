import { Falsible } from "./Types"

export function concatUrls(...urls: Falsible<string>[]) {
	const filtered = urls.filter(Boolean) as string[]
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
