import { Stringlike } from "./Stringlike"

/** Get a proper object representing the keys of the passed type. */
export type KeyOf<Type extends object> = Stringlike<keyof Type>
