import strIncludes from "./strIncludes"

describe("strIncludes helper", () => {
	test("should return false for a nullish `searchThing`", () => {
		expect(strIncludes({}, null)).toEqual(false)
	})

	test("should return true for an included `searchThing`", () => {
		expect(strIncludes({}, "object")).toEqual(true)
	})
})
