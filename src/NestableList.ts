/**
 * Represents the passed type itself, or a recursive list of lists of that type. To get the values in a flat array, use `flat(theList)`.
 *
 * @template Type The type contained by this nestable list.
 */
type NestableList<Type> = Type | NestableList<Type>[]

export default NestableList
