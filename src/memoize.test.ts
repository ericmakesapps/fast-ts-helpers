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

	test("should not call an async memoized function again with the same input", async () => {
		let i = 0

		const memoized = memoize(async () => {
			i += 1

			return i
		})

		const first = await memoized()
		const second = await memoized()

		expect(i).toBe(1)

		expect(first).toEqual(second)
	})

	test("should return a new promise each time an async memoized function is called with the different input", () => {
		const memoized = memoize(async (_: string) => {})

		expect(memoized("hello")).not.toBe(memoized("world"))
	})

	test("should ignore trailing `undefined`s in args", () => {
		const memoized = memoize((_?: string) => {})

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

	test("will attach a then handler on any promise-like if asynchronous is passed as true", async () => {
		const then = jest.fn() as PromiseLike<any>["then"]
		const memoized = memoize(() => ({ then }), { asynchronous: true })

		memoized()

		expect(then).toHaveBeenCalledWith(undefined, expect.any(Function))
	})

	test("will not error if asynchronous is passed for non-catchable result", async () => {
		const memoized = memoize(() => undefined as any, { asynchronous: true })

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

	test("will use an async store, and return whether the cache was hit", async () => {
		const store: Record<string, any> = {}

		const memoized = memoize(
			async (input: string) => {
				return input
			},
			{
				store: {
					get: async (key) => store[key],
					has: async (key) => key in store,
					remove: (key) => delete store[key],
					set: async (key, valuePromise) => {
						return (store[key] = await valuePromise)
					}
				}
			}
		)

		await memoized("hello")

		expect(Object.values(store)).toMatchObject(["hello"])

		await expect(memoized("hello").__cacheHit).resolves.toBe(true)
	})

	test("will not memoize the result if the promise throws with async store", async () => {
		const store: Record<string, any> = {}

		let i = 0

		const memoized = memoize(
			async () => {
				i += 1

				if (i === 1) {
					throw new Error()
				}

				return true
			},
			{
				store: {
					get: async (key) => store[key],
					has: async (key) => key in store,
					remove: (key) => delete store[key],
					set: async (key, valuePromise) => {
						try {
							store[key] = await valuePromise
						} catch {}
					}
				}
			}
		)

		await expect(memoized()).rejects.toThrow()
		await expect(memoized()).resolves.toBe(true)
	})

	test("will not error when passing a non-promise to asynchronous with custom store with has true", async () => {
		const store: Record<string, any> = {}

		const memoized = memoize(() => undefined as any, {
			asynchronous: true,
			store: {
				get: (key) => store[key],
				has: async () => true,
				remove: (key) => delete store[key],
				set: async (key, valuePromise) => {
					try {
						store[key] = await valuePromise
					} catch {}
				}
			}
		})

		await expect(memoized()).resolves.toBeUndefined()
	})

	test("will not error when passing a non-promise to asynchronous with custom store with has false", async () => {
		const store: Record<string, any> = {}

		const memoized = memoize(() => undefined as any, {
			asynchronous: true,
			store: {
				get: (key) => store[key],
				has: async () => false,
				remove: (key) => delete store[key],
				set: async (key, valuePromise) => {
					try {
						store[key] = await valuePromise
					} catch {}
				}
			}
		})

		await expect(memoized()).resolves.toBeUndefined()
	})
})
