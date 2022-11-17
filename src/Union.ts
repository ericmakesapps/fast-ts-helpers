import { Never } from "./Never"

type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

type UnionOf<L, R> = Id<(L & Never<Omit<R, keyof L>>) | (R & Never<Omit<L, keyof R>>)>

/**
 * Represents a smarter discriminating union between types. All props are available, with unshared properties being optional (or undefined after discrimination).
 */
export type Union<A extends readonly [...any]> = A extends [infer L, ...infer R]
	? UnionOf<L, Union<R>>
	: A[0]
