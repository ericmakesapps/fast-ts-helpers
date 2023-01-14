import IdType from "./IdType"
import Key from "./Key"
import Union from "./Union"

/**
 * Represents a type equivalent `TypeIfTrue` if the value of `Property` is `true` or `TypeIfFalse` if the value of `Property` is `false`.
 *
 * @template Property The property to use as the hinge for this type.
 * @template TypeIfTrue The type to return if the value of `Property` is `true`.
 * @template TypeIfFalse The type to return if the value of `Property` is `false`.
 */
type Ternary<
	Property extends Key,
	TypeIfTrue extends object,
	TypeIfFalse extends object
> = IdType<
	Union<
		[{ [K in Property]: true } & TypeIfTrue, { [K in Property]: false } & TypeIfFalse]
	>
>

export default Ternary
