import IdType from "./IdType"
import ReadWriteKeys from "./ReadWriteKeys"

/** Get a type with only the read-writable properties of the passed type. */
type ReadWriteProps<T> = IdType<Pick<T, ReadWriteKeys<T>>>

export default ReadWriteProps
