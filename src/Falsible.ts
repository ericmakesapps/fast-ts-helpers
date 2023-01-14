import Falsey from "./Falsey"

/**
 * Allows any falsey values to be used as part of an optional property, not just undefined.
 *
 * @template Type The type to make optional.
 */
type Falsible<Type> = Type | Falsey

export default Falsible
