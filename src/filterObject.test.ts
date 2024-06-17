import filterObject from "./filterObject"

describe("filterObject helper", () => {
	it("should return a copy of the passed object with all the falsey values filtered out", () => {
		const testObject = {
			foo: "bar",
			bar: 0,
			baz: false,
			qux: null,
			quux: undefined,
			corge: NaN,
			grault: ""
		}

		const result = filterObject(testObject)

		expect(result).not.toBe(testObject)
		expect(result).toEqual({
			foo: "bar"
		})
	})

	it("should return an empty object if all values are falsey", () => {
		const testObject = {
			foo: 0,
			bar: false,
			baz: null,
			qux: undefined,
			quux: NaN,
			corge: ""
		}

		const result = filterObject(testObject)

		expect(result).toEqual({})
	})

	it("should return a copy of the same object if all values are truthy", () => {
		const testObject = {
			foo: "bar",
			bar: 42,
			baz: true,
			qux: {},
			quux: [],
			corge: new Date()
		}

		const result = filterObject(testObject)

		expect(result).toEqual(testObject)
	})

	it("includes symbol keys", () => {
		const key = Symbol("foo")
		const testObject = { [key]: "bar" }

		const result = filterObject(testObject)

		expect(result).toEqual({ [key]: "bar" })
	})
})
