import unique from "./unique"

describe("unique helper", () => {
	test("should filter out duplicates with default comparator", () => {
		expect(unique([1, 1, 1, 2, 2, 3, 4, 4, "hello", "hello", "world"])).toEqual([
			1,
			2,
			3,
			4,
			"hello",
			"world"
		])
	})

	test("should use the custom comparator if passed", () => {
		expect(
			unique(
				[{ val: 1 }, { val: 1 }, { val: "hello" }, { val: "hello" }],
				(a, b) => a.val === b.val
			)
		).toEqual([{ val: 1 }, { val: "hello" }])
	})
})
