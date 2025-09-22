import DateTimeString from "./DateTimeString"
import parseDateTime from "./parseDateTime"

/**
 * Parse a well-formatted literal string into a valid date.
 *
 * @param date The date string to parse.
 * @returns A date object from the string.
 */
function parseDate<T extends DateTimeString>(date: T): Date

/**
 * Attempt to parse arbitrarily formatted string into a valid date, throwing if not able.
 *
 * @param date The date string or object to parse.
 * @param orThrow An error to throw if the passed date cannot be parsed.
 * @returns A valid date.
 */
function parseDate(date: any, orThrow: Error): Date

/**
 * Attempt to parse arbitrarily formatted string into a valid date.
 *
 * @param date The date string or object to parse.
 * @returns A date if we were able to parse the date string, otherwise null.
 */
function parseDate(date: any, orThrow?: Error | undefined): Date | null

/**
 * Attempt to parse arbitrary format date strings into a valid date.
 *
 * @param date The date string to parse
 * @returns A date if we were able to parse the date string, otherwise null
 */
function parseDate(date: unknown, error?: Error): Date | null {
	if (date instanceof Date) {
		return date
	}

	return parseDateTime(date, error)?.toJSDate() ?? null
}

export default parseDate
