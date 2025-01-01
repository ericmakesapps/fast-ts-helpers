import IdType from "./IdType"

type NotUnion<P, Then = P, PCopy = P> = P extends unknown
	? [PCopy] extends [P]
		? Then
		: never
	: never

/**
 * Returns an object created by key-value entries for properties and methods
 * @param entries An iterable object that contains key-value entries for properties and methods.
 */
function fromEntries<const T extends ReadonlyArray<readonly [PropertyKey, unknown]>>(
	entries: T
): IdType<
	{
		[K in NotUnion<T[0], T[number]> as NotUnion<K[0]>]: K[1]
	} & {
		[K in T[number] as K[0]]?: K[1]
	}
>

/**
 * Returns an object created by key-value entries for properties and methods
 * @param entries An iterable object that contains key-value entries for properties and methods.
 */
function fromEntries<T = any>(
	entries: Iterable<readonly [PropertyKey, T]>
): { [k: string]: T }

/**
 * Returns an object created by key-value entries for properties and methods
 * @param entries An iterable object that contains key-value entries for properties and methods.
 */
function fromEntries(entries: Iterable<readonly any[]>): any

function fromEntries<const T extends ReadonlyArray<readonly [PropertyKey, unknown]>>(
	entries: T
): { [K in T[number] as K[0]]: K[1] } {
	return Object.fromEntries(entries) as any
}

export default fromEntries
