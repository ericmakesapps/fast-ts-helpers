import { MutableRefObject } from "react"

/**
 * A version of a RefObject that is readonly, but without `null`. React's default includes
 *   null, sillily.
 *
 * @template Type The type pointed to by this ref object.
 */
type ReadonlyRefObject<T> = Readonly<MutableRefObject<T>>

export default ReadonlyRefObject
