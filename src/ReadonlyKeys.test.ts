import assertType from "./assertType"
import ReadonlyKeys from "./ReadonlyKeys"

describe("ReadonlyKeys helper", () => {
	test("should have the type of only the readonly keys", () => {
		let keys: ReadonlyKeys<{
			readonly a: string
			b: string
		}>

		keys = "a"

		assertType<"a">(keys)

		// @ts-expect-error "b" not assignable to "a"
		assertType<"b">(keys)

		expect(keys).toEqual("a")
	})
})
