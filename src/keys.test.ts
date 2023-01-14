import keys from "./keys"
import assertType from "./assertType"

describe("keys helper", () => {
	test("should get the keys from the passed object", () => {
		const ks = keys({ id: "hi", notId: "hello" })

		assertType<("id" | "notId")[]>(ks)

		expect(ks).toEqual(expect.arrayContaining(["id", "notId"]))
	})
})
