import debounce from "./debounce"

describe("debounce helper", () => {
	test("should create a debouncing function that does not immediately invoke by default", () => {
		const fn = jest.fn()

		const debounced = debounce(fn)

		debounced()

		expect(fn).not.toHaveBeenCalled()

		setTimeout(() => {
			expect(fn).toHaveBeenCalled()
		}, 500)
	})

	test("should create a debouncing function that does ignores multiple calls", async () => {
		const fn = jest.fn()

		const debounced = debounce(fn)

		debounced()
		debounced()
		debounced()
		debounced()
		debounced()

		expect(fn).not.toHaveBeenCalled()

		await new Promise<void>((resolve) =>
			setTimeout(() => {
				expect(fn).toHaveBeenCalled()

				resolve()
			}, 200)
		)
	})

	test("should create a debouncing function that lets you use the results", async () => {
		const fn = jest.fn(() => 0)

		let resolve: () => void

		const check = new Promise<void>((r) => {
			resolve = r
		})

		const debounced = debounce(fn, undefined, undefined, (res) => {
			expect(res).toEqual(0)

			resolve()
		})

		expect(debounced()).toBeUndefined()

		await check
	})

	test("should return the result immediately if immediate is true and ignore subsequent calls", () => {
		const fn = jest.fn(() => 0)

		const debounced = debounce(fn, undefined, true)

		expect(debounced()).toEqual(0)

		debounced()
		debounced()
		debounced()
		debounced()

		expect(fn).toHaveBeenCalledTimes(1)
	})
})
