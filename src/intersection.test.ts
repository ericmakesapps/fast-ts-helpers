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

	it("returns an empty array when given two empty arrays with a comparator", () => {
		expect(intersection([], [], (a, b) => a === b)).toEqual([])
	})

	it("returns an empty array when given one empty array and one non-empty array with a comparator", () => {
		expect(intersection([], [1, 2, 3], (a, b) => a === b)).toEqual([])
		expect(intersection([1, 2, 3], [], (a, b) => a === b)).toEqual([])
	})

	it("returns elements present in both arrays according to the comparator", () => {
		const byVal = (a: { val: number }, b: { val: number }) => a.val === b.val

		expect(
			intersection(
				[{ val: 1 }, { val: 2 }, { val: 3 }],
				[{ val: 2 }, { val: 3 }, { val: 4 }],
				byVal
			)
		).toEqual([{ val: 2 }, { val: 3 }])
	})

	it("returns unique elements according to the comparator", () => {
		const byVal = (a: { val: number }, b: { val: number }) => a.val === b.val

		expect(
			intersection(
				[{ val: 1 }, { val: 2 }, { val: 2 }, { val: 3 }],
				[{ val: 2 }, { val: 2 }, { val: 3 }, { val: 4 }],
				byVal
			)
		).toEqual([{ val: 2 }, { val: 3 }])
	})

	it("keeps the instance from the first array when using a comparator", () => {
		const a = [{ val: 1 }, { val: 2 }]
		const b = [{ val: 2 }, { val: 3 }]
		const result = intersection(a, b, (x, y) => x.val === y.val)

		expect(result).toHaveLength(1)
		expect(result[0]).toBe(a[1])
		expect(result[0]).not.toBe(b[0])
	})
})
