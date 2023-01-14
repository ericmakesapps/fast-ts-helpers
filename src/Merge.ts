import IdType from "./IdType"

type MergeTwo<L, R> = Partial<Omit<L, keyof R> & Omit<R, keyof L>> & {
	[P in keyof R & keyof L]: L[P] | R[P]
}

/**
 * Merge together the types in this tuple type of types, turning the shared properties into union typed props and non-shared properties into optional props.
 *
 * If you have a union type that you to Merge, you can use UnionToTuple, but beware that order matters and it is a little unpredictable.
 */
type Merge<A extends readonly [...any]> = IdType<
	A extends [infer L, infer R, ...infer RR] ? MergeTwo<L, Merge<[R, ...RR]>> : A[0]
>

export default Merge
