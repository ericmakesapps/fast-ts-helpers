import wait from "./wait"

describe("wait helper", () => {
	test("should wait the passed number of millis before resolving", async () => {
		const now = performance.now()

		await wait(100)

		// It waits about 100 millis. We give it a padding of 50 millis on either side.
		expect(Math.abs(performance.now() - now - 100)).toBeLessThan(50)
	})

	test("should default to zero if no number of millis is passed", async () => {
		const now = performance.now()

		await wait()

		// It waits about nothing. We give it a padding of 50 millis.
		expect(performance.now() - now).toBeLessThan(50)
	})
})
