/** Get the number of days from one date to the next date, using UTC for each (not counting the times of the dates). If `date` is after `toDate`, the returned value will be negative. */
function daysFrom(date: Date, toDate: Date) {
	const d = new Date(
		date.getUTCFullYear(),
		date.getUTCMonth(),
		date.getUTCDate(),
		0,
		0,
		0
	)

	const d2 = new Date(
		toDate.getUTCFullYear(),
		toDate.getUTCMonth(),
		toDate.getUTCDate(),
		0,
		0,
		0
	)

	return Math.round((d2.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
}

export default daysFrom
