import { Never } from "./Never"

/**
 * Represents a union between two types where the unshared properties are present on both, but undefined and optional where applicable.
 *
 * @template Type1 The first object in the union.
 * @template Type2 The second object in the union.
 */
export type UnionType<Type1 extends object, Type2 extends object> =
	| (Type1 & Never<Omit<Type2, keyof Type1>>)
	| (Type2 & Never<Omit<Type1, keyof Type2>>)
