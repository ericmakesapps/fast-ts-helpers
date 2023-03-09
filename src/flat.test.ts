import assertType from "./assertType"
import flat from "./flat"

describe("flat helper", () => {
	test("should accept a single value and wrap it", () => {
		const flattened = flat(0)

		assertType<number[]>(flattened)

		expect(flattened).toEqual([0])
	})

	test("should completely flatten the passed nested array", () => {
		const flattened = flat([
			[[[[[[[[[0, [[[[1]]]]]]], [[[[2]]]]], [[[[3]]]]]]], [[[[[[[4]]]]]]]]]
		])

		assertType<number[]>(flattened)

		expect(flattened).toEqual([0, 1, 2, 3, 4])
	})
})
