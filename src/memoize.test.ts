import memoize from "./memoize"

describe("memoize helper", () => {
	test("should not call the memoized function again for the same input", () => {
		let i = 0

		const memoized = memoize(() => {
			i += 1
		})

		memoized()
		memoized()

		expect(i).toEqual(1)
	})

	test("should call the memoized function again if the input is different", () => {
		let i = 0

		const memoized = memoize((_: string) => {
			i += 1
		})

		memoized("hello")
		memoized("world")

		expect(i).toEqual(2)
	})

	test("should not call the memoized function again if an ignored parameter is different", () => {
		let i = 0

		const memoized = memoize(
			(_: string) => {
				i += 1
			},
			{ excludedArguments: [0] }
		)

		memoized("hello")
		memoized("world")

		expect(i).toEqual(1)
	})

	test("should return the same promise each time an async memoized function is called with the same input", () => {
		const memoized = memoize(async () => {})

		expect(memoized()).toBe(memoized())
	})

	test("should return a new promise each time an async memoized function is called with the different input", () => {
		const memoized = memoize(async (_: string) => {})

		expect(memoized("hello")).not.toBe(memoized("world"))
	})

	test("should ignore trailing `undefined`s in args", () => {
		const memoized = memoize(async (_?: string) => {})

		expect(memoized()).toBe(memoized(undefined))
	})

	test("will not memoize the result if the promise throws", async () => {
		let i = 0

		const memoized = memoize(async () => {
			i += 1

			if (i === 1) {
				throw new Error()
			}

			return true
		})

		await expect(memoized()).rejects.toThrow()
		await expect(memoized()).resolves.toBe(true)
	})

	test("will call catch on any promise-like if asynchronous is passed as true", async () => {
		const _catch = jest.fn()
		const memoized = memoize(() => ({ catch: _catch }), { asynchronous: true })

		memoized()

		expect(_catch).toHaveBeenCalled()
	})

	test("will not error if asynchronous is passed for non-catchable result", async () => {
		const memoized = memoize(() => {}, { asynchronous: true })

		expect(memoized()).toBeUndefined()
	})

	test("will use passed store to store cache", () => {
		const store: Record<string, any> = {}

		const memoized = memoize(
			(input: string) => {
				return input
			},
			{
				store: {
					get: (key) => store[key],
					has: (key) => key in store,
					remove: (key) => delete store[key],
					set: (key, value) => (store[key] = value)
				}
			}
		)

		memoized("hello")

		expect(Object.values(store)).toMatchObject(["hello"])
	})
})
