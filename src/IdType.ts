/** ID a type from the mess of types that typescript puts for complicated types. */
export type IdType<T> = T extends infer U ? { [K in keyof U]: U[K] } : never
