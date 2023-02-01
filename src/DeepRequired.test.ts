import DeepRequired from "./DeepRequired"
import assertType from "./assertType"

describe("DeepRequired helper", () => {
	test("should make all properties required", () => {
		let v: DeepRequired<{ a?: { b?: { c?: string | undefined } } }> | undefined

		assertType<{ a: { b: { c: string } } } | undefined>(v)

		expect(v).toBeUndefined()
	})
})
