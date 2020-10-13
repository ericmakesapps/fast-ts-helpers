import { MutableRefObject } from "react"

/**
 * A RefObject that is readonly. React's default includes null, sillily.
 *
 * @template Type The type pointed to by this ref object.
 */
export type ReadonlyRefObject<T> = Readonly<MutableRefObject<T>>
