import injectDates from "./injectDates"
import parseDate from "./parseDate"

describe("injectDates helper", () => {
	test("should inject dates in place of strings", () => {
		expect(injectDates({ now: "2023-01-01T12:51:11" })).toEqual({
			now: parseDate("2023-01-01T12:51:11")
		})
	})

	test("should inject dates in place of numbers", () => {
		const date = new Date()

		expect(injectDates({ date: date.getTime() })).toEqual({ date })
	})

	test("should inject dates in nested objects", () => {
		const date = new Date()

		expect(injectDates({ nested: { date: date.getTime() } })).toEqual({
			nested: { date }
		})
	})
})
