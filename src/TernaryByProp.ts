import { Key } from "./Key"
import { UnionByProp } from "./UnionByProp"

/**
 * Represents a type equivalent `TypeIfTrue` if the value of `Property` is `true` or `TypeIfFalse` if the value of `Property` is `false`.
 *
 * @template Property The property to use as the hinge for this type.
 * @template TypeIfTrue The type to return if the value of `Property` is `true`.
 * @template TypeIfFalse The type to return if the value of `Property` is `false`.
 */
export type TernaryByProp<
	Property extends Key,
	TypeIfTrue extends object,
	TypeIfFalse extends object
> = UnionByProp<Property, true, TypeIfTrue, false, TypeIfFalse>
