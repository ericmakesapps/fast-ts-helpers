/** Get a type that is the type passed in, or a promise resolving to the passed type. */
type PromiseOrValue<T> = T | Promise<T>

export default PromiseOrValue
