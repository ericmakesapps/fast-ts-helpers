import { Key } from "./Key"

/** Generate a union type that hinges on the type of the value of the passed key. */
export type UnionProp<
	P extends Key,
	T1,
	V1,
	T2,
	V2 = void,
	T3 = void,
	V3 = void,
	T4 = void,
	V4 = void,
	T5 = void,
	V5 = void
> =
	| ({
			[K in P]: T1
	  } &
			V1)
	| (V2 extends void
			? {
					[K in P]: T2
			  } & {}
			: {
					[K in P]: T2
			  } &
					V2)
	| (T3 | V3 extends void
			? {
					[K in P]: T1
			  } &
					V1
			: V3 extends void
			? {
					[K in P]: T3
			  }
			: {
					[K in P]: T3
			  } &
					V3)
	| (T4 | V4 extends void
			? {
					[K in P]: T1
			  } &
					V1
			: V4 extends void
			? {
					[K in P]: T4
			  }
			: {
					[K in P]: T4
			  } &
					V4)
	| (T5 | V5 extends void
			? {
					[K in P]: T1
			  } &
					V1
			: V5 extends void
			? {
					[K in P]: T5
			  }
			: {
					[K in P]: T5
			  } &
					V5)
