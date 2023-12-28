/** Get a type that is the type passed in, or an Array of that type. */
type ArrayOrValue<T> = T | Array<T>

export default ArrayOrValue
