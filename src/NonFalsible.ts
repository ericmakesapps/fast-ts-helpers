import { Falsey } from "./Falsey"

/**
 * Exclude falsey values from the passed type.
 *
 * @template Type The type to make non-optional.
 */
export type NonFalsible<Type> = Exclude<Type, Falsey>
