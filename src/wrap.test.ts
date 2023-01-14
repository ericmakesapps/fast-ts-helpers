import wrap from "./wrap"

describe("wrap helper", () => {
	test("should wrap a non-array in an array", () => {
		expect(wrap(1)).toEqual([1])
	})

	test("should not wrap something that's already an array", () => {
		expect(wrap([1])).toEqual([1])
	})
})
