import IdType from "./IdType"
import Key from "./Key"
import Ternary from "./Ternary"

/**
 * Represents a type that will have the properties in `Type` if the value of `Property` is `false`.
 *
 * @template Property The property to use as the hinge for this type.
 * @template Type The type that will be returned if the value of `Property` is `false`.
 */
type IfPropIsFalse<Property extends Key, Type extends object> = IdType<
	Ternary<Property, {}, Type>
>

export default IfPropIsFalse
