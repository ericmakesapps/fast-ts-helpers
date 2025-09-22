import parseDateTime from "./parseDateTime"

describe("parseDate helper", () => {
	test("should convert a date object", () => {
		const date = new Date()

		expect(parseDateTime(date).toMillis()).toBe(date.getTime())
	})

	test("should return null for other values", () => {
		expect(parseDateTime({})).toBeNull()
		expect(parseDateTime([])).toBeNull()
		expect(parseDateTime(true)).toBeNull()
		expect(parseDateTime(false)).toBeNull()
		expect(parseDateTime(null)).toBeNull()
	})

	test("should throw if an error is passed", () => {
		expect(() => parseDateTime({}, new Error("test"))).toThrow("test")
	})
})
