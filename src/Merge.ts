type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

type MergeShared<L, R> = {
	[P in keyof R & keyof L]: L[P] | R[P]
}

type MergeTwo<L, R> = Id<
	Pick<L, Exclude<keyof L, keyof R>> &
		Pick<R, Exclude<keyof R, keyof L>> &
		MergeShared<L, R>
>

/** Merge types together, turning the shared properties into union types. */
export type Merge<A extends readonly [...any]> = A extends [infer L, ...infer R]
	? MergeTwo<L, Merge<R>>
	: A[0]
