import areEqual from "./areEqual"

describe("areEqual helper", () => {
	test("should compare by value", () => {
		expect(areEqual(1, 1)).toBeTruthy()
	})

	test("should check equality of objects by value", () => {
		expect(areEqual({ hello: "world" }, { hello: "world" })).toBeTruthy()
	})

	test("should consider NaNs as equal", () => {
		expect(areEqual(NaN, NaN)).toBeTruthy()
	})

	test("should consider nulls as equal", () => {
		expect(areEqual(null, null)).toBeTruthy()
	})

	test("should consider undefineds as equal", () => {
		expect(areEqual(undefined, undefined)).toBeTruthy()
	})

	test("should consider infinities as equal", () => {
		expect(areEqual(Infinity, Infinity)).toBeTruthy()
	})

	test("should consider empty objects as equal", () => {
		expect(areEqual({}, {})).toBeTruthy()
	})

	test("should consider unique symbols as unequal", () => {
		expect(areEqual(Symbol(), Symbol())).toBeFalsy()
	})

	test("should consider the same symbol twice as equal", () => {
		expect(areEqual(Symbol.for("hi"), Symbol.for("hi"))).toBeTruthy()
	})

	test("should consider classes with the same instance variables equal", () => {
		class Test {
			constructor(public x: number) {}
		}

		expect(areEqual(new Test(0), new Test(0))).toBeTruthy()
	})

	test("should consider classes with the different instance variables unequal", () => {
		class Test {
			constructor(public x: number) {}
		}

		expect(areEqual(new Test(0), new Test(1))).toBeFalsy()
	})

	test("should consider items of different type as not equal", () => {
		expect(areEqual("1", 1)).toBeFalsy()
	})

	test("should consider an array and not an array as not equal", () => {
		expect(areEqual([0], { 0: 0 })).toBeFalsy()
	})

	test("should consider arrays of different lengths as not equal", () => {
		expect(areEqual([0, 1], [0])).toBeFalsy()
	})

	test("should consider arrays with the same values as equal", () => {
		expect(areEqual([0, 1], [0, 1])).toBeTruthy()
	})

	test("should consider objects of different keys as not equal", () => {
		expect(areEqual({ hello: "world" }, { foo: "bar" })).toBeFalsy()
	})

	test("should consider objects with different values as not equal", () => {
		expect(areEqual({ hello: "world" }, { hello: "eric" })).toBeFalsy()
	})

	test("should consider objects with different number of keys as not equal", () => {
		expect(areEqual({ hello: "world", foo: "bar" }, { baz: "eric" })).toBeFalsy()
	})

	test("should consider a map and a set not equal", () => {
		expect(areEqual(new Map(), new Set())).toBeFalsy()
	})

	test("should consider maps containing the same key/value pairs equal", () => {
		expect(areEqual(new Map([[1, "hello"]]), new Map([[1, "hello"]]))).toBeTruthy()
	})

	test("should consider maps containing different key/value pairs not equal", () => {
		expect(areEqual(new Map([[1, "hello"]]), new Map([[2, "world"]]))).toBeFalsy()
	})

	test("should consider sets containing the same values equal", () => {
		expect(areEqual(new Set([1, 2, 3]), new Set([1, 2, 3]))).toBeTruthy()
	})

	test("should consider sets containing different values not equal", () => {
		expect(areEqual(new Set([1, 2, 3]), new Set([4, 5, 6]))).toBeFalsy()
	})

	test("should consider dates with the same time equal", () => {
		expect(areEqual(new Date(0), new Date(0))).toBeTruthy()
	})

	test("should consider dates with different times not equal", () => {
		expect(areEqual(new Date(0), new Date(1))).toBeFalsy()
	})

	test("should consider regular expressions that have the same source and flags equal, regardless of flag order", () => {
		expect(areEqual(/hello/gi, /hello/gi)).toBeTruthy()
	})

	test("should consider regular expressions that have different sources not equal", () => {
		expect(areEqual(/hello/gi, /world/gi)).toBeFalsy()
	})
})
