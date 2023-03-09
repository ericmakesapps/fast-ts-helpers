import assertType from "./assertType"
import keys from "./keys"

describe("keys helper", () => {
	test("should get the keys from the passed object", () => {
		const ks = keys({ id: "hi", notId: "hello" })

		assertType<("id" | "notId")[]>(ks)

		expect(ks).toEqual(expect.arrayContaining(["id", "notId"]))
	})
})
