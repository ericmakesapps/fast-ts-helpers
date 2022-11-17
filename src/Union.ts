import { IdType } from "./IdType"
import { Never } from "./Never"
import { UnionToTuple } from "./UnionToTuple"

type UnionOf<L, R> = (L & Never<Omit<R, keyof L>>) | (R & Never<Omit<L, keyof R>>)

type UnionFromTuple<A extends readonly [...any]> = A extends [infer L, ...infer R]
	? UnionOf<L, UnionFromTuple<R>>
	: A[0]

/**
 * Makes a discriminating union from the passed union type. All props are available, with unshared properties being optional (or undefined after discrimination).
 */
export type Union<T> = IdType<UnionFromTuple<UnionToTuple<T>>>
