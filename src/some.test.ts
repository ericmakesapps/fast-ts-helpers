import some from "./some"

describe("Some helper", () => {
	test("Checks if some value in an array matches and short-circuits if so", () => {
		const predicate = jest.fn((v) => v >= 0)
		const result = some([0, 1, 2, 3, 4], predicate)

		expect(result).toBe(true)
		expect(predicate).toHaveBeenCalledTimes(1)
	})

	test("Checks if some value in a set matches and short-circuits if so", () => {
		const predicate = jest.fn((v) => v >= 0)
		const result = some(new Set([0, 1, 2, 3, 4]), predicate)

		expect(result).toBe(true)
		expect(predicate).toHaveBeenCalledTimes(1)
	})

	test("Checks if some value in a map matches and short-circuits if so", () => {
		const predicate = jest.fn((k, v) => k >= 0 && v <= 0)
		const result = some(
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
		expect(predicate).toHaveBeenCalledTimes(1)
	})

	test("does not short-circuits in arrays if no value matches", () => {
		const predicate = jest.fn((v) => v < 0)
		const result = some([0, 1, 2, 3, 4], predicate)

		expect(result).toBe(false)
		expect(predicate).toHaveBeenCalledTimes(5)
	})

	test("does not short-circuits in sets if no value matches", () => {
		const predicate = jest.fn((v) => v < 0)
		const result = some(new Set([0, 1, 2, 3, 4]), predicate)

		expect(result).toBe(false)
		expect(predicate).toHaveBeenCalledTimes(5)
	})

	test("does not short-circuits in maps if no value matches", () => {
		const predicate = jest.fn((k) => k < 0)
		const result = some(
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
		expect(predicate).toHaveBeenCalledTimes(5)
	})

	test("returns false for non-collection objects", () => {
		const predicate = jest.fn((k) => k < 1)
		const result = some({} as any, predicate)

		expect(result).toBe(false)
		expect(predicate).not.toHaveBeenCalled()
	})
})
