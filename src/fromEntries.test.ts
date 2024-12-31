import assertType from "./assertType"
import fromEntries from "./fromEntries"

describe("fromEntries helper", () => {
	test("should make a typed object from the entries array", () => {
		const ks = fromEntries([
			["hello", "world"],
			["id", 1],
			["notId", 2]
		])

		assertType<{
			hello: "world"
			id: 1
			notId: 2
		}>(ks)

		expect(ks).toEqual({
			hello: "world",
			id: 1,
			notId: 2
		})
	})
})
