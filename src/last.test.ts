import last from "./last"

describe("last helper", () => {
	test("should get the last item from the passed array", () => {
		const val = last(["hello", "world"] as string[]) satisfies string | undefined

		expect(val).toEqual("world")
	})

	test("should have the express type of last in a tuple", () => {
		const val = last(["hello", "world"] as const) satisfies "world"

		expect(val).toEqual("world")
	})

	test("should return undefined for an empty array", () => {
		const val = last([])

		expect(val).toBeUndefined()
	})

	test("should return undefined for undefined", () => {
		const val = last(undefined)

		expect(val).toBeUndefined()
	})

	test("should return undefined for null", () => {
		const val = last(null)

		expect(val).toBeUndefined()
	})
})
