import cacheKey from "./cacheKey"

describe("cacheKey helper", () => {
	test("will return the same cache key for equivalent objects", () => {
		expect(cacheKey({ hello: "world" })).toEqual(cacheKey({ hello: "world" }))
		expect(cacheKey({ hello: "world" })).not.toEqual(cacheKey({ hello: "bar" }))
	})

	test("will return the same cache key for equivalent arrays", () => {
		expect(cacheKey(["hello"])).toEqual(cacheKey(["hello"]))
		expect(cacheKey(["hello"])).not.toEqual(cacheKey(["world"]))
	})

	test("will return the same cache key for equivalent dates", () => {
		expect(cacheKey(new Date("2020-01-01"))).toEqual(cacheKey(new Date("2020-01-01")))
		expect(cacheKey(new Date("2020-01-01"))).not.toEqual(cacheKey(new Date("2024-01-01")))
	})

	test("will return the same cache key for equivalent regular expressions", () => {
		expect(cacheKey(/hello/g)).toEqual(cacheKey(/hello/g))
		expect(cacheKey(/hello/g)).not.toEqual(cacheKey(/world/g))
	})

	test("will return the same cache key for equivalent error objects", () => {
		expect(cacheKey(new Error("hello"))).toEqual(cacheKey(new Error("hello")))
		expect(cacheKey(new Error("hello"))).not.toEqual(cacheKey(new Error("world")))
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
