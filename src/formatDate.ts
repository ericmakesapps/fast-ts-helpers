type FormatDateOption = "short" | "long" | "month" | "time"

/**
 * Format a date into a user friendly date string based on the passed option, as follows:
 *
 * * `"short"` -> `"7/3/2020"`.
 * * `"long"` -> `"Jul. 3, 2020"`.
 * * `"month"` -> `"July 2020"`.
 * * `"time"` -> `"11 a.m."`.
 *
 * @param date The date to format.
 * @param option Whether to return a short or long date string. Defaults to `"short"`.
 * @returns The date string.
 */
function formatDate(date: Date, option?: FormatDateOption): string
/**
 * Format a date into a user friendly date string based on the passed option, as follows:
 *
 * * `"short"` -> `"7/3/2020"`.
 * * `"long"` -> `"Jul. 3, 2020"`.
 * * `"month"` -> `"July 2020"`.
 * * `"time"` -> `"11 a.m."`.
 *
 * @param date The date to format.
 * @param option What format of date to use. Defaults to `"short"`.
 * @returns The date string.
 */
function formatDate(date: Date | undefined, option?: FormatDateOption): string | undefined

function formatDate(date: Date | undefined, option: FormatDateOption = `short`) {
	if (!date) {
		return undefined
	}

	switch (option) {
		case `short`:
			return date.toLocaleDateString()
		case `long`:
			return date
				.toLocaleDateString(undefined, {
					year: `numeric`,
					month: `short`,
					day: `numeric`
				})
				.replace(` `, `. `)
				.replace(/(May)\./, `$1`)
		case `month`:
			return date.toLocaleDateString(undefined, {
				year: `numeric`,
				month: `long`
			})
		case `time`:
			return date
				.toLocaleTimeString(undefined, {
					hour: `numeric`
				})
				.replace(/[A-Z]/g, (match) => `${match.toLowerCase()}.`)
	}
}

export default formatDate
