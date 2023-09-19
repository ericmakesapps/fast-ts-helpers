import fullyMatches from "./fullyMatches"

describe("fullyMatches helper", () => {
	test("should ensure a string matches a regex fully", async () => {
		expect(fullyMatches("hello world", /world/)).toBe(false)
		expect(fullyMatches("hello world", /hello world/)).toBe(true)
	})

	test("should return false for undefined if `treatUndefinedAsEmptyString` is not passed", async () => {
		expect(fullyMatches(undefined, /.?/)).toBe(false)
	})

	test("should treat undefined as empty string if `treatUndefinedAsEmptyString` is true", async () => {
		expect(fullyMatches(undefined, /.?/, true)).toBe(true)
	})

	test("should invisibly use a string regex", async () => {
		expect(fullyMatches("hello world", "world")).toBe(false)
		expect(fullyMatches("hello world", "hello world")).toBe(true)
	})
})
