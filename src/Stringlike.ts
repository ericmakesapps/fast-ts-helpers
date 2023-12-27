/**
 * Get the string-like version of the passed key. E.g., `0` -> `"0"`.
 *
 * @template Key The key to map to its string-like version.
 */
type Stringlike<Key> = Key extends string
	? Key
	: Key extends number
		? StringForNumber[Key]
		: string

type StringForNumber = {
	0: `0`
	1: `1`
	2: `2`
	3: `3`
	4: `4`
	5: `5`
	6: `6`
	7: `7`
	8: `8`
	9: `9`
	10: `10`
	100: `100`
	1234: `1234`
	[n: number]: string
}

export default Stringlike
