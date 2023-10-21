import cacheKey from "./cacheKey"

describe("cacheKey helper", () => {
	test("will return the same cache key for the same object", () => {
		expect(cacheKey({ hello: "world" })).toEqual(cacheKey({ hello: "world" }))
	})

	test("will return the same cache key for the object with same keys in different order", () => {
		expect(
			cacheKey({
				hello: "world",
				foo: "bar"
			})
		).toEqual(
			cacheKey({
				foo: "bar",
				hello: "world"
			})
		)
	})

	test("will return the same cache key each call for the same function instance", () => {
		const fn = () => {}

		expect(cacheKey(fn)).toEqual(cacheKey(fn))
	})

	test("will return a cache key for non-stringifiable stuff", () => {
		expect(cacheKey(undefined)).toEqual(cacheKey(undefined))
		expect(cacheKey(Symbol("Hello"))).toEqual(cacheKey(Symbol("Hello")))
		expect(cacheKey(Symbol("Hello"))).not.toEqual(cacheKey(Symbol("World")))
	})
})
