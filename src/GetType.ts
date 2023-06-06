/**
 * Extract the generic type from an array or a promise.
 *
 * @template Type The type from which to extract the generic type.
 */
type GetType<Type> = Type extends (infer U)[]
	? U
	: Type extends PromiseLike<infer U>
	? U
	: never

export default GetType
