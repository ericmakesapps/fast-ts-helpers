import daysFrom from "./daysFrom"

/** Get the number of days between the two passed dates, using UTC for each date (not counting the times of the dates). */
function daysBetween(date: Date, andDate: Date) {
	return Math.abs(daysFrom(date, andDate))
}

export default daysBetween
