import daysBetween from "./daysBetween"
import parseDate from "./parseDate"

describe("keys helper", () => {
	test("should return the positive number of days if `date` is before `toDate`", () => {
		expect(daysBetween(parseDate("2023-01-01"), parseDate("2023-01-15"))).toEqual(14)
	})

	test("should return the positive number of days if `date` is after `toDate`", () => {
		expect(daysBetween(parseDate("2023-01-11"), parseDate("2023-01-7"))).toEqual(4)
	})
})
