function createStoreFor(namespace: string) {
	const prefix = `${namespace}™øå`

	function p(key: string) {
		// Use some characters that are unlikely to be repeated.
		return `${prefix}${key}`
	}

	return {
		get<T>(key: string) {
			const string = localStorage.getItem(p(key))

			if (string != null) {
				try {
					return JSON.parse(string) as T
				} catch {}
			}

			return undefined
		},
		set<T>(key: string, value: T) {
			// If something JSON cannot stringify is passed, it returns undefined. Let's make that save empty string instead, as localStorage would just stringify it.
			localStorage.setItem(p(key), JSON.stringify(value) ?? ``)
		},
		remove(key: string) {
			localStorage.removeItem(p(key))
		},
		has(key: string) {
			return Object.keys(localStorage).includes(p(key))
		},
		clear() {
			for (const key of Object.keys(localStorage)) {
				if (key.startsWith(prefix)) {
					localStorage.removeItem(key)
				}
			}
		}
	}
}

/**
 * A wrapper around `localStorage` that stores values using `JSON.stringify`. You can use directly, or call it to create a storage with a namespace.
 */
const Storage = Object.assign(createStoreFor, createStoreFor(`øß√`))

export default Storage
