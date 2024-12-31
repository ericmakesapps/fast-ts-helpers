import assertType from "./assertType"
import entries from "./entries"

describe("entries helper", () => {
	test("should make an entries array from the passed object", () => {
		const ks = entries({
			hello: "world",
			1: 2
		})

		assertType<(["hello", string] | ["1", number])[]>(ks)

		expect(ks).toContainEqual(["hello", "world"])
		expect(ks).toContainEqual(["1", 2])
	})
})
