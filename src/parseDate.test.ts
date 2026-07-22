import parseDate from "./parseDate"

// Underlying logic is tested in parseDateTime, so we just need to test the wrapper here.

describe("parseDate helper", () => {
	test("should return the same date instance when given a Date", () => {
		const date = new Date()

		expect(parseDate(date)).toBe(date)
	})

	test("should return a JS Date for parseable values", () => {
		expect(parseDate("2022-01-01T12:30:30Z")).toBeInstanceOf(Date)
		expect(parseDate(0)).toBeInstanceOf(Date)
	})

	test("should return null for unparseable values", () => {
		expect(parseDate(undefined)).toBeNull()
		expect(parseDate(null)).toBeNull()
		expect(parseDate("not-a-date")).toBeNull()
		expect(parseDate({})).toBeNull()
	})
})
