import last from "./last"

describe("last helper", () => {
	test("should get the last item from the passed array", () => {
		expect(last(["hello", "world"])).toEqual("world")
	})

	test("should have the express type of last in a tuple", () => {
		const val: "world" = last(["hello", "world"] as const)

		expect(val).toEqual("world")
	})

	test("should return undefined for an empty array", () => {
		expect(last([])).toBeUndefined()
	})

	test("should return undefined for undefined", () => {
		expect(last(undefined)).toBeUndefined()
	})

	test("should return undefined for null", () => {
		expect(last(null)).toBeUndefined()
	})
})
