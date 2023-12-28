/** Get a type that is the type passed in, or a Set of that type. */
type SetOrValue<T> = T | Set<T>

export default SetOrValue
