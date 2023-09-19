import uuid from "./uuid"

describe("uuid helper", () => {
	test("generates a new UUID every call", async () => {
		const generated: string[] = []
		for (let i = 0; i < 10_000; i += 1) {
			const newUuid = uuid()

			expect(generated).not.toContain(newUuid)

			generated.push(newUuid)
		}
	})
})
