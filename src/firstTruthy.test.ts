import wait from "./wait"
import firstTruthy from "./firstTruthy"

describe("firstTruthy helper", () => {
	test("should resolve to the first truthy value from an array of promises, as soon as it resolves", async () => {
		const now = performance.now()

		await expect(
			firstTruthy([
				wait(10).then(() => 0),
				wait(20).then(() => 1),
				wait(30).then(() => 2),
				wait(40).then(() => 3)
			])
		).resolves.toBe(1)

		// It resolves as soon as the first one resolves to a truthy value, not waiting for the others
		expect(performance.now() - now).toBeLessThan(30)
	})

	test("should reject if no passed promise resolves to a truthy value", async () => {
		await expect(
			firstTruthy([
				wait(40).then(() => 0),
				wait(30).then(() => ""),
				wait(20).then(() => undefined),
				wait(10).then(() => null)
			])
		).rejects.toThrow()
	})
})
