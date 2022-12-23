import { areEqual } from "./areEqual"

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

	test("should not consider items of different type equal", () => {
		expect(areEqual("1", 1)).toBeFalsy()
	})

	test("should not consider an array and not an array as equal", () => {
		expect(areEqual([0], { 0: 0 })).toBeFalsy()
	})

	test("should not consider arrays of different lengths as equal", () => {
		expect(areEqual([0, 1], [0])).toBeFalsy()
	})

	test("should not consider objects of different keys as equal", () => {
		expect(areEqual({ hello: "world" }, { foo: "bar" })).toBeFalsy()
	})

	test("should not consider objects with different values as equal", () => {
		expect(areEqual({ hello: "world" }, { hello: "eric" })).toBeFalsy()
	})
})
