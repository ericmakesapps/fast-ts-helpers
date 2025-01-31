import Stringlike from "./Stringlike"

/** Get a properly typed array of the entries of the passed object. */
export default function entries<T extends object>(obj: T) {
	return Object.entries(obj) as NonNullable<
		{ [K in keyof T]: [Stringlike<K>, T[K]] }[keyof T]
	>[]
}
