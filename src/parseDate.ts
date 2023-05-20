import truthy from "./truthy"

/**
 * Parse a date, number, or string into a Date.
 *
 * @param date The date, number, or string to parse into a Date.
 * @returns The Date that was parsed.
 */
function parseDate(date: string | number | Date): Date
/**
 * Parse a date, number, or string into a Date.
 *
 * @param date The date, number, or string to parse into a Date.
 * @returns The Date that was parsed.
 */
function parseDate(date: string | number | Date | undefined): Date | undefined

function parseDate(date: string | number | Date | undefined) {
	if (date == null || date instanceof Date) {
		return date
	}

	if (typeof date === `number`) {
		return new Date(date)
	}

	let [datePart, timePart] = date.split(`T`)

	const now = new Date()

	let year = now.getFullYear()
	let month = now.getMonth()
	let day = now.getDate()
	let hours = 0
	let minutes = 0
	let seconds = 0
	let offset = 0

	// If the first part includes a colon, it's actually just a time part
	if (datePart.includes(`:`)) {
		timePart = datePart
		datePart = ``
	}

	// If the datePart is set, parse that date part
	if (truthy(datePart)) {
		const [rawYear, rawMonth, rawDay] = datePart.split(`-`).map(parseFloat)

		year = rawYear

		if (rawMonth != null) {
			month = rawMonth - 1
		}

		if (rawDay != null) {
			day = rawDay
		}
	}

	let zoneHalf: string | undefined

	// If the time part is defined, get the hour, minute, and second values
	if (truthy(timePart)) {
		const parts = timePart.split(/Z|\+|(?=-)/)

		const timeHalf = parts[0]!

		zoneHalf = parts[1]

		const [rawHours, rawMinutes, rawSeconds] = timeHalf.split(`:`).map(parseFloat)

		hours = rawHours

		if (rawMinutes != null) {
			minutes = rawMinutes
		}

		if (rawSeconds != null) {
			seconds = rawSeconds
		}
	}

	// The time constructed by the date and time parts
	const manualDate = new Date(Date.UTC(year, month, day, hours, minutes, seconds))

	manualDate.setUTCFullYear(year, month, day)

	// If the zone half of the time part is defined, do that offset here
	if (truthy(zoneHalf)) {
		const [offsetHours, offsetMinutes] = zoneHalf.split(`:`).map(parseFloat)

		offset += offsetHours * 60

		if (offsetMinutes) {
			const sign = offsetHours < 0 ? -1 : 1

			offset += sign * offsetMinutes
		}
	}

	manualDate.setMinutes(manualDate.getMinutes() - offset)

	return manualDate
}

export default parseDate
