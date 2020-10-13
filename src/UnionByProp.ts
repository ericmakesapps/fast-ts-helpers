import { Key } from "./Key"
import { Never } from "./Never"

/**
 * Represents a union between two types that hinges on the type of a given property. If the value of `Property` extends `Value1`, then the returned type will extend `Type1`. If the value of `Property` extends `Value2`, then the property will extend `Type2`.
 *
 * @template Property The key that is the hinge for this union
 * @template Value1 The first property type to use as the check.
 * @template Type1 The type to return if the value of `Property` extends `Type1`.
 * @template Value2 The second property type to use as the check.
 * @template Type2 The type to return if the value of `Property` extends `Type2`.
 */
export type UnionByProp<
	Property extends Key,
	Value1,
	Type1 extends object,
	Value2,
	Type2 extends object
> =
	| ({
			[K in Property]: Value1
	  } &
			Type1 &
			Never<Omit<Type2, keyof Type1>>)
	| ({
			[K in Property]: Value2
	  } &
			Type2 &
			Never<Omit<Type1, keyof Type2>>)
