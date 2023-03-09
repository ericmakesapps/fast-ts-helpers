import assertType from "./assertType"
import Union from "./Union"

describe("Union helper", () => {
	test("should combine types into a union", () => {
		let v: Union<[{ hello: "world" }, { foo: "bar" }]> | undefined

		assertType<
			| {
					hello: "world"
					foo?: undefined
			  }
			| {
					foo: "bar"
					hello?: undefined
			  }
			| undefined
		>(v)

		expect(v).toBeUndefined()
	})

	test("should work with a single type", () => {
		let v: Union<[{ hello: "world" }]> | undefined

		assertType<
			| {
					hello: "world"
			  }
			| undefined
		>(v)

		expect(v).toBeUndefined()
	})
})
