import map from "./map"

describe("map helper", () => {
	test("should map a single object to an array", () => {
		expect(map("hi", (s) => s.length)).toEqual([2])
	})

	test("should map an array", () => {
		expect(map(["hi", "hello"], (s) => s.length)).toEqual([2, 5])
	})
})
