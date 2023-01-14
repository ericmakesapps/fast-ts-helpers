import omit from "./omit"

describe("omit helper", () => {
	test("should omit a prop from an object by string", () => {
		expect(omit({ id: "hi", notId: "hello" }, "id")).toEqual({ notId: "hello" })
	})

	test("should omit a prop from an object by regex", () => {
		expect(omit({ id: "hi", notId: "hello" }, /id/)).toEqual({ notId: "hello" })
	})

	test("should return undefined if input is undefined", () => {
		expect(omit(undefined, /id/)).toBeUndefined()
	})
})
