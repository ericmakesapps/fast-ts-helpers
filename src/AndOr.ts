import IdType from "./IdType"

type AndOrOfTwo<First, Second> = First | Second | (First & Second)

/**
 * Combine types such that they are either a union or an intersection of all the passed types. This is useful when you want to be able to set all or some of the properties, without making them partial. This will map out all the different combinations, so don't make it too deep.
 *
 * If you have a literal union type that you to pass through AndOr, you can use UnionToTuple, but **beware** that order matters and it is a little unpredictable.
 */
type AndOr<Types extends [...any]> = IdType<
	Types extends [infer First, infer Second, ...infer Rest]
		? AndOrOfTwo<First, AndOr<[Second, ...Rest]>>
		: Types[0]
>

export default AndOr
