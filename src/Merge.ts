import { IdType } from "./IdType"
import { UnionToTuple } from "./UnionToTuple"

type MergeShared<L, R> = {
	[P in keyof R & keyof L]: L[P] | R[P]
}

type MergeTwo<L, R> = Pick<L, Exclude<keyof L, keyof R>> &
	Pick<R, Exclude<keyof R, keyof L>> &
	MergeShared<L, R>

type MergeIntersect<A extends readonly [...any]> = A extends [infer L, ...infer R]
	? MergeTwo<L, MergeIntersect<R>>
	: A[0]

/** Merge together the types in this union type, turning the shared properties into union types. */
export type Merge<T> = IdType<MergeIntersect<UnionToTuple<T>>>
