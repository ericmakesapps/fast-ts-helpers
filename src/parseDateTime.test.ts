import { DateTime } from "luxon"

import parseDateTime from "./parseDateTime"

describe("parseDateTime helper", () => {
	test("should convert a date object", () => {
		const date = new Date()

		expect(parseDateTime(date).toMillis()).toBe(date.getTime())
	})

	test("should convert a luxon DateTime", () => {
		const dateTime = DateTime.fromISO("2024-01-09T13:45:30.000Z")

		expect(parseDateTime(dateTime).toMillis()).toBe(dateTime.toMillis())
	})

	test("should return null for an invalid Date", () => {
		expect(parseDateTime(new Date(Number.NaN))).toBeNull()
	})

	test("should return null for an invalid DateTime", () => {
		expect(parseDateTime(DateTime.invalid("test"))).toBeNull()
	})

	test("should return null for other object values", () => {
		expect(parseDateTime({})).toBeNull()
		expect(parseDateTime([])).toBeNull()
	})

	test("should return null for non-string non-number primitives", () => {
		expect(parseDateTime(true)).toBeNull()
		expect(parseDateTime(false)).toBeNull()
		expect(parseDateTime(null)).toBeNull()
		expect(parseDateTime(undefined)).toBeNull()
	})

	test("should return null for empty or whitespace-only strings", () => {
		expect(parseDateTime("")).toBeNull()
		expect(parseDateTime("   ")).toBeNull()
		expect(parseDateTime("\t\n")).toBeNull()
	})

	test("should return null for zero dates", () => {
		expect(parseDateTime("0000-00-00")).toBeNull()
		expect(parseDateTime("0000-00-00 00:00:00")).toBeNull()
	})

	test("should convert a number timestamp", () => {
		expect(parseDateTime(0)?.toMillis()).toBe(0)
		expect(parseDateTime(1_700_000_000_000)?.toMillis()).toBe(1_700_000_000_000)
	})

	test("should parse a well-formed ISO string", () => {
		const parsed = parseDateTime("2024-01-09T13:45:30.000Z")

		expect(parsed?.isValid).toBe(true)
		expect(parsed?.toUTC().toISO()).toBe("2024-01-09T13:45:30.000Z")
	})

	test("should parse formats that standard parsers do not handle", () => {
		const parsed = parseDateTime("Jan 9, 2024")

		expect(parsed?.isValid).toBe(true)
		expect(parsed?.toISODate()).toBe("2024-01-09")
	})

	test("should parse timezone offsets", () => {
		expect(parseDateTime("2022-01-01T12:30:30+05:00")?.toUTC().toISO()).toBe(
			"2022-01-01T07:30:30.000Z"
		)
		expect(parseDateTime("2022-01-01T12:30:30-05:30")?.toUTC().toISO()).toBe(
			"2022-01-01T18:00:30.000Z"
		)
	})

	test("should parse early and historical dates", () => {
		expect(parseDateTime("0001-01-01")?.toUTC().toISO()).toBe("0001-01-01T00:00:00.000Z")
		expect(parseDateTime("1883-11-18")?.toUTC().toISO()).toBe("1883-11-18T00:00:00.000Z")
	})

	test("should throw if an error is passed and the value is invalid", () => {
		const error = new Error("test")

		expect(() => parseDateTime({}, error)).toThrow(error)
		expect(() => parseDateTime([], error)).toThrow(error)
		expect(() => parseDateTime(true, error)).toThrow(error)
		expect(() => parseDateTime("", error)).toThrow(error)
		expect(() => parseDateTime("   ", error)).toThrow(error)
		expect(() => parseDateTime(null, error)).toThrow(error)
		expect(() => parseDateTime("0000-00-00", error)).toThrow(error)
		expect(() => parseDateTime(new Date(Number.NaN), error)).toThrow(error)
		expect(() => parseDateTime(DateTime.invalid("test"), error)).toThrow(error)
		expect(() => parseDateTime("not-a-date", error)).toThrow(error)
	})

	test("should not throw when an error is passed and the value is valid", () => {
		const date = new Date("2024-01-09T13:45:30.000Z")
		const dateTime = DateTime.fromISO("2024-01-09T13:45:30.000Z")
		const error = new Error("test")

		expect(parseDateTime(date, error).toMillis()).toBe(date.getTime())
		expect(parseDateTime(dateTime, error).toMillis()).toBe(dateTime.toMillis())
		expect(parseDateTime("2024-01-09T13:45:30.000Z", error).toMillis()).toBe(
			date.getTime()
		)
		expect(parseDateTime(date.getTime(), error).toMillis()).toBe(date.getTime())
	})
})
