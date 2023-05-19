import assertType from "./assertType"
import ReadWriteProps from "./ReadWriteProps"

const keys: ReadWriteProps<{
	readonly a: string
	b: string
}> = { b: "hello" }

describe("ReadWriteProps helper", () => {
	test("should have an object type with only the read-writable keys", () => {
		assertType<{ readonly b: string }>(keys)

		expect(keys.b).toEqual("hello")
	})
})
