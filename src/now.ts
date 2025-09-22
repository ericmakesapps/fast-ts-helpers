import { DateTime, Settings } from "luxon"

if (!(Settings as any)._fastTsHelpersConfigured) {
	Object.assign(Settings, {
		defaultZone: "Etc/UTC",
		_fastTsHelpersConfigured: true
	})
}

/**
 * Return a date corresponding to the current date in the correct time zone.
 *
 * @returns A DateTime of the current date in the correct time zone.
 */
export default function now() {
	return DateTime.now()
}
