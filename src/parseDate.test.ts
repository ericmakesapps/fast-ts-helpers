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
		expect(parseDate("2022-01-01T12:30:30")).toEqual(
			new Date(2022, 0, 1, 12, 30 - new Date().getTimezoneOffset(), 30)
		)
	})
	test("should convert a date string date with timezone", () => {
		expect(parseDate("2022-01-01T12:30:30+05:00")).toEqual(
			new Date(2022, 0, 1, 12 - 5, 30 - new Date().getTimezoneOffset(), 30)
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
