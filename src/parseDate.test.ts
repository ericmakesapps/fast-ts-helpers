import parseDate from "./parseDate"

describe("parseDate helper", () => {
	test("should leave a date object untouched", () => {
		const date = new Date()

		expect(parseDate(date)).toBe(date)
	})

	test("should return undefined if the param is undefined", () => {
		expect(parseDate(undefined)).toBeUndefined()
	})

	test("should convert a date string date", () => {
		expect(parseDate("2022-01-01T12:30:30").toISOString()).toEqual(
			"2022-01-01T12:30:30.000Z"
		)
	})

	test("should use DST if the date falls within DST", () => {
		expect(parseDate("2023-03-01T12:30:30").toISOString()).toEqual(
			"2023-03-01T12:30:30.000Z"
		)
	})

	test("should use standard time if the date falls within standard time", () => {
		expect(parseDate("2023-03-15T12:30:30").toISOString()).toEqual(
			"2023-03-15T12:30:30.000Z"
		)
	})

	test("should convert a date string date with timezone", () => {
		expect(parseDate("2022-01-01T12:30:30+05:00").toISOString()).toEqual(
			"2022-01-01T07:30:30.000Z"
		)
	})

	test("should convert a time string", () => {
		const now = new Date()

		expect(parseDate("12:30:30")).toEqual(
			new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate(),
				12,
				30 - new Date().getTimezoneOffset(),
				30
			)
		)
	})

	test("should convert a number date", () => {
		expect(parseDate(0)).toEqual(new Date(0))
	})
})
