import assertExtends from "./assertExtends"
import fromEntries from "./fromEntries"
import tuple from "./tuple"

describe("fromEntries helper", () => {
	test("should make a typed object from the entries array, parsing unions", () => {
		const obj = fromEntries([
			["hello" as "hello" | "foo", "world"],
			["id", 1],
			["notId", 2]
		])

		assertExtends<
			{
				hello?: "world"
				foo?: "world"
				id: 1
				notId: 2
			},
			typeof obj
		>(obj)

		expect(obj).toEqual({
			hello: "world",
			id: 1,
			notId: 2
		})
	})

	test("should use an array of tuples to make an object", () => {
		const arr = [tuple("hello", "world"), tuple("id", 1), tuple("notId", 2)]

		const obj = fromEntries(arr)

		assertExtends<{ [key: string]: string | number | undefined }, typeof obj>(obj)

		expect(obj).toEqual({
			hello: "world",
			id: 1,
			notId: 2
		})
	})

	test("should use an array of constant tuples to make an object", () => {
		const arr: (["id", 1] | ["notId", 2] | ["hello", "world"])[] = [["hello", "world"]]

		const obj = fromEntries(arr)

		assertExtends<
			{
				id?: 1
				notId?: 2
				hello?: "world"
			},
			typeof obj
		>(obj)

		expect(obj).toEqual({
			hello: "world"
		})
	})
})
