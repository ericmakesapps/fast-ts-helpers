import Stringlike from "./Stringlike"

/** Get a properly typed array of the entries of the passed object. */
function entries<T extends object, K extends keyof T>(obj: T) {
	return Object.entries(obj) as [Stringlike<K>, T[K]][]
}

export default entries
