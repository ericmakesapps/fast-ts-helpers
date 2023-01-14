import pick from "./pick"

describe("pick helper", () => {
	test("should pick a prop from an object by string", () => {
		expect(pick({ id: "hi", notId: "hello" }, "id")).toEqual({ id: "hi" })
	})

	test("should pick a prop from an object by regex", () => {
		expect(pick({ id: "hi", notId: "hello" }, /id/)).toEqual({ id: "hi" })
	})

	test("should return undefined if input is undefined", () => {
		expect(pick(undefined, /id/)).toBeUndefined()
	})
})
