import isClassNameValue from "./isClassNameValue"

describe("isClassNameValue helper", () => {
	test("should return true for class name values", () => {
		expect(isClassNameValue("hello")).toEqual(true)
	})

	test("should return false when not a class name value", () => {
		expect(isClassNameValue({})).toEqual(false)
	})
})
