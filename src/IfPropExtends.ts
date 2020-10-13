import { Key } from "./Key"
import { Never } from "./Never"

/**
 * Represents a type that has the properties in Type if the value of `Property` extends `Value`, otherwise will not if the value extends `FallbackValue`.
 *
 * @template Property The property to serve as the hinge of this type.
 * @template Value The value with which the type should be applied.
 * @template Type The type whose properties depend on the value of `Property`
 * @template FallbackValue The alternate value for `Property`.
 */
export type IfPropExtends<
	Property extends Key,
	Value,
	Type extends object,
	FallbackValue
> =
	| ({
			[K in Property]: Value
	  } &
			Type)
	| ({
			[K in Property]: FallbackValue
	  } &
			Never<Type>)
