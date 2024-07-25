import { __subscribers } from "./useSharedState"

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
		set<T>(key: string, value: T, updateSubscribers = false) {
			// If something JSON cannot stringify is passed, it returns undefined. Let's make that save empty string instead, as localStorage would just stringify it.
			localStorage.setItem(p(key), JSON.stringify(value) ?? ``)

			if (updateSubscribers) {
				if (key in __subscribers) {
					for (const setValue of __subscribers[key].setters) {
						setValue(value)
					}
				}
			}
		},
		remove(key: string, updateSubscribers = false) {
			localStorage.removeItem(p(key))

			if (updateSubscribers) {
				if (key in __subscribers) {
					for (const setValue of __subscribers[key].setters) {
						setValue(undefined)
					}
				}
			}
		},
		has(key: string) {
			return Object.keys(localStorage).includes(p(key))
		},
		clear(updateSubscribers = false) {
			for (const key of Object.keys(localStorage)) {
				if (key.startsWith(prefix)) {
					localStorage.removeItem(key)

					if (updateSubscribers) {
						const baseKey = key.slice(prefix.length)

						if (baseKey in __subscribers) {
							for (const setValue of __subscribers[baseKey].setters) {
								setValue(undefined)
							}
						}
					}
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
