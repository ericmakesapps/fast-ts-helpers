import AndOr from "./AndOr"
import assertType from "./assertType"

describe("AndOr helper", () => {
	test("should combine types into a union/intersection", () => {
		let v: AndOr<[{ hello: "world" }, { foo: "bar" }]> | undefined

		assertType<
			| {
					hello: "world"
			  }
			| {
					foo: "bar"
			  }
			| {
					hello: "world"
					foo: "bar"
			  }
			| undefined
		>(v)

		expect(v).toBeUndefined()
	})

	test("should work with a single type", () => {
		let v: AndOr<[{ hello: "world" }]> | undefined

		assertType<
			| {
					hello: "world"
			  }
			| undefined
		>(v)

		expect(v).toBeUndefined()
	})

	test("should work with more than two types", () => {
		let v: AndOr<[{ hello: "world" }, { foo: "bar" }, { my: "first app" }]> | undefined

		assertType<
			| {
					hello: "world"
			  }
			| {
					foo: "bar"
			  }
			| {
					my: "first app"
			  }
			| {
					foo: "bar"
					my: "first app"
			  }
			| {
					hello: "world"
					foo: "bar"
			  }
			| {
					hello: "world"
					my: "first app"
			  }
			| {
					hello: "world"
					foo: "bar"
					my: "first app"
			  }
			| undefined
		>(v)

		expect(v).toBeUndefined()
	})
})
