import { Stringlike } from "./Types"

export function entries<T extends object, K extends keyof T>(obj: T) {
	return Object.entries(obj) as [Stringlike<K>, T[K]][]
}
