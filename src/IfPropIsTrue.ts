import { Key } from "./Key"
import { Never } from "./Never"
import { Ternary } from "./Ternary"

/**
 * Represents a type that will have the properties in `Type` if the value of `Property` is `true`.
 *
 * @template Property The property to use as the hinge for this type.
 * @template Type The type that will be returned if the value of `Property` is `true`.
 */
export type IfPropIsTrue<Property extends Key, Type extends object> = Ternary<
	Property,
	Type,
	Never<Type>
>
