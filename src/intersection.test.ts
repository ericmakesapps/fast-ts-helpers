import intersection from "./intersection"

describe("intersection helper", () => {
	it("returns an empty array when given two empty arrays", () => {
		expect(intersection([], [])).toEqual([])
	})

	it("returns an empty array when given one empty array and one non-empty array", () => {
		expect(intersection([], [1, 2, 3])).toEqual([])
		expect(intersection([1, 2, 3], [])).toEqual([])
	})

	it("returns an array of elements that are present in both input arrays", () => {
		expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3])
		expect(intersection(["a", "b", "c"], ["b", "c", "d"])).toEqual(["b", "c"])
		expect(intersection([true, false, true], [true, true, false])).toEqual([true, false])
	})

	it("returns an array of unique elements", () => {
		expect(intersection([1, 2, 2, 3], [2, 2, 3, 4])).toEqual([2, 3])
		expect(intersection(["a", "b", "c", "c"], ["b", "c", "d", "d"])).toEqual(["b", "c"])
		expect(intersection([true, false, true], [true, true, false, false])).toEqual([
			true,
			false
		])
	})
})
