import wait from "./wait"

describe("wait helper", () => {
	test("should wait the passed number of millis before resolving", async () => {
		const now = performance.now()

		await wait(50)

		// It waits about 50 millis. We give it a padding of 5 millis on either side.
		expect(Math.abs(performance.now() - now - 50)).toBeLessThan(5)
	})

	test("should default to zero if no number of millis is passed", async () => {
		const now = performance.now()

		await wait()

		// It waits about nothing. We give it a padding of 5 millis.
		expect(performance.now() - now).toBeLessThan(5)
	})
})
