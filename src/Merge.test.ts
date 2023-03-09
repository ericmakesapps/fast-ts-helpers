import assertType from "./assertType"
import Merge from "./Merge"

describe("Merge helper", () => {
	test("should combine types into a merged type", () => {
		let v: Merge<[{ hello: "world"; hi: "one" }, { foo: "bar"; hi: "two" }]> | undefined

		assertType<
			| {
					hello?: "world"
					foo?: "bar"
					hi: "one" | "two"
			  }
			| undefined
		>(v)

		expect(v).toBeUndefined()
	})

	test("should work with a single type", () => {
		let v: Merge<[{ hello: "world" }]> | undefined

		assertType<
			| {
					hello: "world"
			  }
			| undefined
		>(v)

		expect(v).toBeUndefined()
	})
})
