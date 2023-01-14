import Falsible from "./Falsible"
import NestableList from "./NestableList"

/**
 * A falsible version of the passed type or a recursive list of lists of a falsible version of that type. To get the truthy values in a flat array, use `filter(flat(theList))`.
 *
 * @template Type The type contained by this falsible nested list.
 */
type FalsibleList<T> = NestableList<Falsible<T>>

export default FalsibleList
