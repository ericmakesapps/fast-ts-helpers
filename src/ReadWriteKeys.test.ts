import assertType from "./assertType"
import ReadWriteKeys from "./ReadWriteKeys"

describe("ReadWriteKeys helper", () => {
	test("should have the type of only the read-writable keys", () => {
		let keys: ReadWriteKeys<{
			readonly a: string
			b: string
		}>

		keys = "b"

		assertType<"b">(keys)

		// @ts-expect-error "a" not assignable to "b"
		assertType<"a">(keys)

		expect(keys).toEqual("b")
	})
})
