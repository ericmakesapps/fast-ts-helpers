import cacheKey from "./cacheKey"
import Func from "./Func"

/** The options for the memoization. */
export type MemoizeOptions<TValue = any> = {
	/** Array of indices to not use for indexing. */
	excludedArguments?: number[]

	/** Whether it is an async function. This is needed if the result **is not** the standard Promise type, but should still be treated as a Promise. If the result **is** of type Promise, this is **not** needed. Default is `false`. */
	asynchronous?: false

	/** If you want to store the cache somewhere other than local memory (like in a DB). */
	store?: {
		set: (key: string, value: TValue) => void
		get: (key: string) => TValue
		has: (key: string) => boolean
		remove: (key: string) => void
	}
}

export type AsyncMemoizeOptions<TValue = any> = {
	/** Array of indices to not use for indexing. */
	excludedArguments?: number[]

	/** Whether it is an async function. This is needed if the result **is not** the standard Promise type, but should still be treated as a Promise. If the result **is** of type Promise, this is **not** needed. Default is `false`. */
	asynchronous?: true

	/** If you want to store the cache somewhere other than local memory (like in a DB). */
	store?: {
		set: <TValue>(key: string, valuePromise: Promise<TValue>) => void
		get: (key: string) => TValue | PromiseLike<TValue>
		has: (key: string) => boolean | PromiseLike<boolean>
		remove: (key: string) => void
	}
}

/**
 * Memoize this function so that future calls with the same parameters will return the same result without recalculating. Functions are checked by identity, while other parameters are checked by equality.
 *
 * **Depends on `json-stable-stringify`**.
 *
 * @template F The type of the function being memoized.
 * @param func The function to memoize.
 * @param options The options to use for memoization.
 * @returns A memoized version of the passed function.
 */
function memoize<F extends Func<any[], PromiseLike<any>>>(
	func: F,
	options?: AsyncMemoizeOptions<Awaited<ReturnType<F>>>
): Func<Parameters<F>, ReturnType<F> & { __cacheHit: Promise<boolean> }>

function memoize<F extends Func>(func: F, options?: MemoizeOptions<ReturnType<F>>): F

function memoize<F extends Func>(
	func: F,
	{
		asynchronous = false,
		excludedArguments,
		store = undefined as any
	}: MemoizeOptions | AsyncMemoizeOptions = {}
) {
	if (!store) {
		// If store wasn't defined, use a local, in-memory store.
		const cache: Record<string, unknown> = {}

		store = {
			get: (key) => cache[key],
			has: (key) => key in cache,
			set: (key, value) => (cache[key] = value),
			remove: (key) => delete cache[key]
		} as MemoizeOptions["store"] & {}
	}

	if (excludedArguments) {
		excludedArguments = excludedArguments.sort().reverse()
	}

	function isPromiseLike(obj: unknown): obj is PromiseLike<any> {
		return (
			obj instanceof Promise ||
			(asynchronous && typeof (obj as Promise<unknown>)?.then === `function`)
		)
	}

	return function memoized(this: F, ...args: unknown[]) {
		const truncateEnd = args.length > 0 && args[args.length - 1] === undefined
		const keys = excludedArguments || truncateEnd ? args.slice(0) : args

		if (truncateEnd) {
			let index = keys.length - 1

			while (index >= 0 && keys[index] === undefined) {
				index -= 1
			}

			keys.length = index + 1
		}

		if (excludedArguments) {
			for (const i of excludedArguments) {
				if (i >= 0 && i < keys.length) {
					keys.splice(i, 1)
				}
			}
		}

		const key = cacheKey(keys)

		const has = store.has(key)

		if (typeof has === "boolean") {
			if (!has) {
				let value = func.apply(this, args)

				store.set(key, value)

				if (isPromiseLike(value)) {
					return Object.assign(
						(async () =>
							value.then(undefined, async (err) => {
								store.remove(key)

								throw err
							}))(),
						{ __cacheHit: Promise.resolve(false) }
					)
				}

				return value
			}

			return store.get(key)
		}

		return Object.assign(
			has.then((has) => {
				if (!has) {
					let value = func.apply(this, args)

					store.set(key, value)

					if (isPromiseLike(value)) {
						return value.then(undefined, async (err) => {
							store.remove(key)

							throw err
						})
					}

					return value
				}

				return store.get(key)
			}),
			{ __cacheHit: has }
		)
	} as F
}

export default memoize
