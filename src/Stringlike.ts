/**
 * Get the string-like version of the passed key. E.g., `0` -> `"0"`.
 *
 * @template Key The key to map to its string-like version.
 */
type Stringlike<Key> = Key extends string | number | bigint | boolean | null | undefined
	? `${Key}`
	: string

export default Stringlike
