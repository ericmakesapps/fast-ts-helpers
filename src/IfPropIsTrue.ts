import IdType from "./IdType"
import Key from "./Key"
import Ternary from "./Ternary"

/**
 * Represents a type that will have the properties in `Type` if the value of `Property` is `true`.
 *
 * @template Property The property to use as the hinge for this type.
 * @template Type The type that will be returned if the value of `Property` is `true`.
 */
type IfPropIsTrue<Property extends Key, Type extends object> = IdType<
	Ternary<Property, Type, {}>
>

export default IfPropIsTrue
