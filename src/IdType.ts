/** ID a type from the mess of types that typescript puts for complicated types. */
type IdType<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

export default IdType
