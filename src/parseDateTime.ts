import { DateTime, Settings } from "luxon"

import as from "./as"
import DateTimeString from "./DateTimeString"

if (!(Settings as any)._fastTsHelpersConfigured) {
	Object.assign(Settings, {
		defaultZone: "Etc/UTC",
		_fastTsHelpersConfigured: true
	})
}

/**
 * Parse a well-formatted literal string into a luxon `DateTime`.
 *
 * @param date The date string to parse.
 * @returns A valid `DateTime` from the string.
 */
function parseDateTime<T extends DateTimeString>(date: T): DateTime<true>

/**
 * Convert a date object into a luxon `DateTime`. This version assumes the date is good.
 *   If it is not, this will silently return null.
 *
 * @param date The date object to convert.
 * @returns A valid `DateTime` if we were able to parse the date string, otherwise null.
 */
function parseDateTime(date: Date | DateTime, orThrow?: Error | undefined): DateTime<true>

/**
 * Attempt to parse an arbitrary string into a luxon `DateTime`, throwing if not able.
 *
 * @param date The date string or object to parse.
 * @param orThrow An error to throw if the passed date cannot be parsed.
 * @returns A valid `DateTime`.
 */
function parseDateTime(date: any, orThrow: Error): DateTime<true>

/**
 * Attempt to parse arbitrary string into a luxon `DateTime` object.
 *
 * @param date The date string or object to parse.
 * @returns A valid `DateTime` if we were able to parse the date string, otherwise null.
 */
function parseDateTime(date: any, orThrow?: Error | undefined): DateTime<true> | null

/**
 * Attempt to parse arbitrary format date strings into a valid date.
 *
 * @param date The date string to parse
 * @returns A date if we were able to parse the date string, otherwise null
 */
function parseDateTime(date: unknown, error?: Error): DateTime<true> | null {
	if (date == null || (typeof date === "string" && /0000-00-00/.test(date))) {
		return orThrow(null, error)
	}

	if (typeof date === "object") {
		if (date instanceof Date) {
			date = DateTime.fromJSDate(date)
		}

		if (date instanceof DateTime) {
			return orThrow(date, error)
		}

		return orThrow(null, error)
	}

	if (typeof date === "number") {
		return orThrow(DateTime.fromMillis(date), error)
	}

	if (typeof date !== "string" || !date.trim()) {
		return orThrow(null, error)
	}

	// Normalize the AM/PM, if present, by converting to uppercase and removing
	//   delineating periods and/or spaces.
	date = date
		.trim()
		.toUpperCase()
		.replace(/\s*([AP])\s*\.?M\s*\.?/g, " $1M")

	as<string>(date)

	const parsers = ["fromISO", "fromRFC2822", "fromHTTP", "fromSQL"] as const

	// Attempt to parse the date string using the standard parsers first
	for (const parser of parsers) {
		const parsedDateTime = DateTime[parser](date)

		if (isValid(parsedDateTime)) {
			return parsedDateTime
		}
	}

	// Check for duplicates with this case-sensitive pattern: ("[^"]+"),? //.+(\n|.)+\1
	/** An array of common date formats */
	const formats = [
		"yyyy-MM-dd", // Example: '2024-01-09'
		"yyyy-MM", // Example: '2024-01'
		"yyyy", // Example: '2024'
		"HH:mm:ss", // Example: '13:45:30'
		"HH:mm", // Example: '13:45'
		"HH", // Example: '13'
		"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", // Example: '2024-01-09T13:45:30.123Z'
		"yyyy-MM-dd'T'HH:mm:ss.SSSXXX", // Example: '2024-01-09T13:45:30.123+01:00'
		"yyyy-MM-dd'T'HH:mm:ss.SSS", // Example: '2024-01-09T13:45:30.123'
		"yyyy-MM-dd'T'HH:mm:ss'Z'", // Example: '2024-01-09T13:45:30Z'
		"yyyy-MM-dd'T'HH:mm:ssXXX", // Example: '2024-01-09T13:45:30+01:00'
		"yyyy-MM-dd'T'HH:mm:ss", // Example: '2024-01-09T13:45:30'
		"yyyy-MM-dd'T'HH:mm", // Example: '2024-01-09T13:45'
		"yyyy-MM-dd'T'HH", // Example: '2024-01-09T13'
		"yyyy-MM'T'HH:mm:ss.SSS'Z'", // Example: '2024-01T13:45:30.123Z'
		"yyyy-MM'T'HH:mm:ss.SSSXXX", // Example: '2024-01T13:45:30.123+01:00'
		"yyyy-MM'T'HH:mm:ss.SSS", // Example: '2024-01T13:45:30.123'
		"yyyy-MM'T'HH:mm:ss'Z'", // Example: '2024-01T13:45:30Z'
		"yyyy-MM'T'HH:mm:ssXXX", // Example: '2024-01T13:45:30+01:00'
		"yyyy-MM'T'HH:mm:ss", // Example: '2024-01T13:45:30'
		"yyyy-MM'T'HH:mm", // Example: '2024-01T13:45'
		"yyyy-MM'T'HH", // Example: '2024-01T13'
		"yyyy'T'HH:mm:ss.SSS'Z'", // Example: '2024T13:45:30.123Z'
		"yyyy'T'HH:mm:ss.SSSXXX", // Example: '2024T13:45:30.123+01:00'
		"yyyy'T'HH:mm:ss.SSS", // Example: '2024T13:45:30.123'
		"yyyy'T'HH:mm:ss'Z'", // Example: '2024T13:45:30Z'
		"yyyy'T'HH:mm:ssXXX", // Example: '2024T13:45:30+01:00'
		"yyyy'T'HH:mm:ss", // Example: '2024T13:45:30'
		"yyyy'T'HH:mm", // Example: '2024T13:45'
		"yyyy'T'HH", // Example: '2024T13'
		"yyyy-M-d", // Example: '2024-1-9'
		"MM/dd/yyyy", // Example: '01/09/2024'
		"M/d/yyyy", // Example: '1/9/2024'
		"MM-dd-yyyy", // Example: '01-09-2024'
		"M-d-yyyy", // Example: '1-9-2024'
		"MM.dd.yyyy", // Example: '01.09.2024'
		"M.d.yyyy", // Example: '1.9.2024'
		"MMM dd, yyyy", // Example: 'Jan 09, 2024'
		"MMM d, yyyy", // Example: 'Jan 9, 2024'
		"MMMM dd, yyyy", // Example: 'January 09, 2024'
		"MMMM d, yyyy", // Example: 'January 9, 2024'
		"MMM dd yyyy", // Example: 'Jan 09 2024'
		"MMM d yyyy", // Example: 'Jan 9 2024'
		"MMMM dd yyyy", // Example: 'January 09 2024'
		"MMMM d yyyy", // Example: 'January 9 2024'
		"dd/MM/yyyy", // Example: '09/01/2024'
		"d/M/yyyy", // Example: '9/1/2024'
		"dd-MM-yyyy", // Example: '09-01-2024'
		"d-M-yyyy", // Example: '9-1-2024'
		"dd.MM.yyyy", // Example: '09.01.2024'
		"d.M.yyyy", // Example: '9.1.2024'
		"dd MMM yyyy", // Example: '09 Jan 2024'
		"d MMM yyyy", // Example: '9 Jan 2024'
		"dd MMMM yyyy", // Example: '09 January 2024'
		"d MMMM yyyy", // Example: '9 January 2024'
		"yyyy/MM/dd", // Example: '2024/01/09'
		"yyyy/M/d", // Example: '2024/1/9'
		"yyyy/MM", // Example: '2024/01'
		"yyyy.MM", // Example: '2024.01'
		"MMMM yyyy", // Example: 'January 2024'
		"MMM yyyy", // Example: 'Jan 2024'
		"MMM yy", // Example: 'Jan 24'
		"yyyy 'W'WW", // Example: '2024 W01'
		"yyyy 'W'WW E", // Example: '2024 W01 1'
		"yyyy 'Q'Q", // Example: '2024 Q1'
		"yyyy 'Q'Q MMM", // Example: '2024 Q1 Jan'
		"yyyy 'Q'Q MMM dd", // Example: '2024 Q1 Jan 01'
		"yyyy LLL", // Example: '2024 Jan'
		"yyyy LLL dd", // Example: '2024 Jan 01'
		"yyyy LLLL", // Example: '2024 January'
		"yyyy LLLL dd", // Example: '2024 January 01'
		"dd LLL yyyy", // Example: '01 Jan 2024'
		"dd LLLL yyyy", // Example: '01 January 2024'
		"H", // Example: '7'
		"hh:mm a", // Example: '01:45 PM'
		"hhmm a", // Example: '0145 PM'
		"hh a", // Example: '01 PM'
		"h:mm a", // Example: '1:45 PM'
		"hmm a", // Example: '145 PM'
		"h a", // Example: '1 PM'
		"yyyy-MM-dd HH:mm:ss.SSS'Z'", // Example: '2024-01-09 13:45:30.123Z'
		"yyyy-MM-dd HH:mm:ss.SSSXXX", // Example: '2024-01-09 13:45:30.123+01:00'
		"yyyy-MM-dd HH:mm:ss.SSS", // Example: '2024-01-09 13:45:30.123'
		"yyyy-MM-dd HH:mm:ss'Z'", // Example: '2024-01-09 13:45:30Z'
		"yyyy-MM-dd HH:mm:ssXXX", // Example: '2024-01-09 13:45:30+01:00'
		"yyyy-MM-dd HH:mm:ss", // Example: '2024-01-09 13:45:30'
		"yyyy-MM-dd HH:mm", // Example: '2024-01-09 13:45'
		"yyyy-MM-dd HH", // Example: '2024-01-09 13'
		"MM/dd/yyyy HH:mm:ss.SSS'Z'", // Example: '01/09/2024 13:45:30.123Z'
		"MM/dd/yyyy HH:mm:ss.SSSXXX", // Example: '01/09/2024 13:45:30.123+01:00'
		"MM/dd/yyyy HH:mm:ss.SSS", // Example: '01/09/2024 13:45:30.123'
		"MM/dd/yyyy HH:mm:ss'Z'", // Example: '01/09/2024 13:45:30Z'
		"MM/dd/yyyy HH:mm:ssXXX", // Example: '01/09/2024 13:45:30+01:00'
		"MM/dd/yyyy HH:mm:ss", // Example: '01/09/2024 13:45:30'
		"MM/dd/yyyy HH:mm", // Example: '01/09/2024 13:45'
		"MM/dd/yyyy HH", // Example: '01/09/2024 13'
		"dd/MM/yyyy HH:mm:ss.SSS'Z'", // Example: '09/01/2024 13:45:30.123Z'
		"dd/MM/yyyy HH:mm:ss.SSSXXX", // Example: '09/01/2024 13:45:30.123+01:00'
		"dd/MM/yyyy HH:mm:ss.SSS", // Example: '09/01/2024 13:45:30.123'
		"dd/MM/yyyy HH:mm:ss'Z'", // Example: '09/01/2024 13:45:30Z'
		"dd/MM/yyyy HH:mm:ssXXX", // Example: '09/01/2024 13:45:30+01:00'
		"dd/MM/yyyy HH:mm:ss", // Example: '09/01/2024 13:45:30'
		"E, dd MMM yyyy HH:mm:ss 'GMT'", // Example: 'Tue, 09 Jan 2024 13:45:30 GMT'
		"E, dd MMM yyyy HH:mm:ss.SSS 'GMT'", // Example: 'Tue, 09 Jan 2024 13:45:30.123 GMT'
		"E, dd MMM yyyy HH:mm:ss z", // Example: 'Tue, 09 Jan 2024 13:45:30 PST'
		"E, dd MMM yyyy HH:mm:ss.SSS z", // Example: 'Tue, 09 Jan 2024 13:45:30.123 PST'
		"E, dd MMM yyyy HH:mm:ss Z", // Example: 'Tue, 09 Jan 2024 13:45:30 -0800'
		"E, dd MMM yyyy HH:mm:ss.SSS Z", // Example: 'Tue, 09 Jan 2024 13:45:30.123 -0800'
		"E, dd MMM yyyy HH:mm:ss XXX", // Example: 'Tue, 09 Jan 2024 13:45:30 -08:00'
		"E, dd MMM yyyy HH:mm:ss.SSS XXX", // Example: 'Tue, 09 Jan 2024 13:45:30.123 -08:00'
		"E, dd MMM yyyy HH:mm:ss x", // Example: 'Tue, 09 Jan 2024 13:45:30 -0800'
		"E, dd MMM yyyy HH:mm:ss.SSS x", // Example: 'Tue, 09 Jan 2024 13:45:30.123 -0800'
		"E, dd MMM yyyy HH:mm:ss xx", // Example: 'Tue, 09 Jan 2024 13:45:30 -0800'
		"E, dd MMM yyyy HH:mm:ss.SSS xx", // Example: 'Tue, 09 Jan 2024 13:45:30.123 -0800'
		"E, dd MMM yyyy HH:mm:ss xxx", // Example: 'Tue, 09 Jan 2024 13:45:30 -08:00'
		"E, dd MMM yyyy HH:mm:ss.SSS xxx", // Example: 'Tue, 09 Jan 2024 13:45:30.123 -08:00'
		"E, dd MMM yyyy HH:mm:ss xxxx", // Example: 'Tue, 09 Jan 2024 13:45:30 -08:00'
		"E, dd MMM yyyy HH:mm:ss.SSS xxxx", // Example: 'Tue, 09 Jan 2024 13:45:30.123 -08:00'
		"E, dd MMM yyyy HH:mm:ss xxxxx", // Example: 'Tue, 09 Jan 2024 13:45:30 -08:00'
		"E, dd MMM yyyy HH:mm:ss.SSS xxxxx", // Example: 'Tue, 09 Jan 2024 13:45:30.123 -08:00'
		"E, dd MMM yyyy HH:mm:ss 'UTC'", // Example: 'Tue, 09 Jan 2024 13:45:30 UTC'
		"E, dd MMM yyyy HH:mm:ss.SSS 'UTC'" // Example: 'Tue, 09 Jan 2024 13:45:30.123 UTC'
	]

	// Attempt to parse the date string using each format
	for (const format of formats) {
		const parsedDateTime = DateTime.fromFormat(date, format)

		if (isValid(parsedDateTime)) {
			return parsedDateTime
		}
	}

	// If none of the formats match, return null
	return orThrow(null, error)
}

export default parseDateTime

function isValid(date: DateTime | null | undefined): date is DateTime<true> {
	return Boolean(date?.isValid)
}

function orThrow(date: DateTime | null | undefined, orThrow: Error | undefined) {
	if (isValid(date)) {
		return date
	}

	if (orThrow) {
		throw orThrow
	}

	return null
}
