import IdType from "./IdType"
import ReadonlyKeys from "./ReadonlyKeys"

/** Get a type with only the readonly properties of the passed type. */
type ReadonlyProps<T> = IdType<Pick<T, ReadonlyKeys<T>>>

export default ReadonlyProps
