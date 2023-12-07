/** Get a type that is the type passed in, or a promise-like resolving to the passed type. */
type PromiseLikeOrValue<T> = T | PromiseLike<T>

export default PromiseLikeOrValue
