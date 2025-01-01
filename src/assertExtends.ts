export type Equals<X, Y> =
	(<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? Y : never

/**
 * Asserts the type of obj at compile-time. Will throw an error if the type is not compatible.
 */
function assertExtends<T1, T2>(obj: Equals<T1, T2>) {}

export default assertExtends
