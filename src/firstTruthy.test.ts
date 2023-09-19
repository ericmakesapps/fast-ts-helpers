import assertType from "./assertType"
import firstTruthy from "./firstTruthy"
import wait from "./wait"

describe("firstTruthy helper", () => {
	test("should resolve to the first truthy value from an array of promises, as soon as it resolves", async () => {
		const now = performance.now()

		await expect(
			firstTruthy([
				wait(250).then(() => 0),
				wait(500).then(() => 1),
				wait(750).then(() => 2),
				wait(1000).then(() => 3)
			])
		).resolves.toBe(1)

		// It resolves as soon as the first one resolves to a truthy value, not waiting for the others
		expect(performance.now() - now).toBeLessThan(750)
	})

	test("should reject to the passed error if no passed promise resolves to a truthy value", async () => {
		const race = firstTruthy(
			[
				wait(40).then(() => 0),
				wait(30).then(() => ""),
				wait(20).then(() => undefined),
				wait(10).then(() => null)
			],
			new Error("Oh no")
		)

		assertType<Promise<string | number>>(race)

		await expect(race).rejects.toThrow("Oh no")
	})

	test("should reject to a default error if no passed promise resolves to a truthy value", async () => {
		const race = firstTruthy([
			wait(40).then(() => 0),
			wait(30).then(() => ""),
			wait(20).then(() => undefined),
			wait(10).then(() => null)
		])

		assertType<Promise<string | number>>(race)

		await expect(race).rejects.toThrow("None of the promises resolved to a truthy value")
	})

	test("should resolve to undefined if null is passed for error and no passed promise resolves to a truthy value", async () => {
		const race = firstTruthy(
			[
				wait(40).then(() => 0),
				wait(30).then(() => ""),
				wait(20).then(() => undefined),
				wait(10).then(() => null)
			],
			null
		)

		assertType<Promise<string | number | undefined>>(race)

		await expect(race).resolves.toBeUndefined()
	})

	test("ignores errors if rethrow is not passed", async () => {
		const race = firstTruthy([Promise.reject(new Error()), wait(100).then(() => 1)])

		await expect(race).resolves.toBe(1)
	})

	test("rethrows errors if rethrow is true", async () => {
		const race = firstTruthy(
			[Promise.reject(new Error()), wait(100).then(() => 1)],
			undefined,
			true
		)

		await expect(race).rejects.toThrow()
	})
})
