import { Falsible } from "./Falsible"
import { NestableList } from "./NestableList"

/**
 * A falsible version of the passed type or a recursive list of lists of a falsible version of that type.
 *
 * @template Type The type contained by this falsible nested list.
 */
export type FalsibleList<T> = NestableList<Falsible<T>>
