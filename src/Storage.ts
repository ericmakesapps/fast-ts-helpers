/**
 * Create an instance of a wrapper around `localStorage` that stores values using `JSON.stringify` using a specific namespace.
 */
export class Storage {
	constructor(private namespace: string) {}

	private prefix = `${this.namespace}™øå`

	private p(key: string) {
		// Use some characters that are unlikely to be repeated.
		return `${this.prefix}${key}`
	}

	get<T>(key: string): T | undefined {
		if (!this.has(key)) {
			return undefined
		}

		const string = localStorage.getItem(this.p(key))!

		return Boolean(string) ? (JSON.parse(string) as T) : undefined
	}
	set<T>(key: string, value: T) {
		// If something JSON cannot stringify is passed, it returns undefined. Let's make that save empty string instead, as localStorage would just strigify it.
		localStorage.setItem(this.p(key), JSON.stringify(value) ?? ``)
	}
	remove(key: string) {
		localStorage.removeItem(this.p(key))
	}
	has(key: string) {
		return Object.keys(localStorage).includes(this.p(key))
	}
	clear() {
		for (const key of Object.keys(localStorage)) {
			if (key.startsWith(this.prefix)) {
				localStorage.removeItem(key)
			}
		}
	}
}

/**
 * A wrapper around `localStorage` that stores values using `JSON.stringify`.
 */
export const storage = new Storage(`øß√`)
