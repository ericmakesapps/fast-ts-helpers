import Stringlike from "./Stringlike"

/** Get a proper object representing the keys of the passed type. */
type KeyOf<Type extends object> = Stringlike<keyof Type>

export default KeyOf
