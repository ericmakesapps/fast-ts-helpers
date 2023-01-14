import Never from "./Never"

/**
 * Represents a type that either conforms to the passed type, or doesn't.
 *
 * @template Type The type to use for the representation.
 */
type AllOrNone<Type extends object> = Type | Never<Type>

export default AllOrNone
