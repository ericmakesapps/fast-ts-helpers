import now from "./now"

describe("now util", () => {
	test("should return a DateTime that corresponds to the current time", () => {
		expect(now().toMillis()).toBeCloseTo(new Date().getTime(), -3)
	})
})
