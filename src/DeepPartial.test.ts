import DeepPartial from "./DeepPartial"
import assertType from "./assertType"

describe("DeepPartial helper", () => {
	test("should make all properties optional", () => {
		let v: DeepPartial<{ a: { b: { c: string } } }> | undefined

		assertType<
			| {}
			| {
					a: {}
			  }
			| {
					a: {
						b: {}
					}
			  }
			| {
					a: {
						b: {
							c: undefined
						}
					}
			  }
			| undefined
		>(v)

		expect(v).toBeUndefined()
	})
})
