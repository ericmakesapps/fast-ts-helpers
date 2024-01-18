import every from "./every"

describe("Every helper", () => {
	test("Checks if every value in an array matches", () => {
		const predicate = jest.fn((v) => v >= 0)
		const result = every([0, 1, 2, 3, 4], predicate)

		expect(result).toBe(true)
		expect(predicate).toHaveBeenCalledTimes(5)
	})

	test("Checks if every value in a set matches", () => {
		const predicate = jest.fn((v) => v >= 0)
		const result = every(new Set([0, 1, 2, 3, 4]), predicate)

		expect(result).toBe(true)
		expect(predicate).toHaveBeenCalledTimes(5)
	})

	test("Checks if every value in a map matches", () => {
		const predicate = jest.fn((k, v) => k >= 0 && v <= 0)
		const result = every(
			new Map([
				[0, 0],
				[1, -1],
				[2, -2],
				[3, -3],
				[4, -4]
			]),
			predicate
		)

		expect(result).toBe(true)
		expect(predicate).toHaveBeenCalledTimes(5)
	})

	test("short-circuits in arrays if some value doesn't match", () => {
		const predicate = jest.fn((v) => v < 0)
		const result = every([0, 1, 2, 3, 4], predicate)

		expect(result).toBe(false)
		expect(predicate).toHaveBeenCalledTimes(1)
	})

	test("short-circuits in sets if some value doesn't match", () => {
		const predicate = jest.fn((v) => v < 0)
		const result = every(new Set([0, 1, 2, 3, 4]), predicate)

		expect(result).toBe(false)
		expect(predicate).toHaveBeenCalledTimes(1)
	})

	test("short-circuits in maps if some value doesn't match", () => {
		const predicate = jest.fn((k) => k < 0)
		const result = every(
			new Map([
				[0, 0],
				[1, -1],
				[2, -2],
				[3, -3],
				[4, -4]
			]),
			predicate
		)

		expect(result).toBe(false)
		expect(predicate).toHaveBeenCalledTimes(1)
	})

	test("returns false for non-collection objects", () => {
		const predicate = jest.fn((k) => k < 1)
		const result = every({} as any, predicate)

		expect(result).toBe(false)
		expect(predicate).not.toHaveBeenCalled()
	})
})
