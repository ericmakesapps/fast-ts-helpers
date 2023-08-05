import DeepReadonly from "./DeepReadonly"

describe("DeepReadonly helper", () => {
	test("should make all properties readonly", () => {
		let v: DeepReadonly<{ a: { b: string } }> = { a: { b: "hello" } }

		// @ts-expect-error This should error as it is now readonly
		v.a.b = "world"

		// @ts-expect-error This should error as it is now readonly
		v.a = { b: "world" }

		expect(v).toBeDefined()
	})
})
