import assertType from "./assertType"
import ReadonlyProps from "./ReadonlyProps"

const keys: ReadonlyProps<{
	readonly a: string
	b: string
}> = { a: "hello" }

describe("ReadonlyProps helper", () => {
	test("should have an object type with only the readonly keys", () => {
		assertType<{ readonly a: string }>(keys)

		expect(keys.a).toEqual("hello")
	})
})
