/**
 * Extract the generic type from an array or a promise.
 *
 * @template Type The type from which to extract the generic type.
 */
export type GetType<Type> = Type extends (infer U)[]
	? U
	: Type extends Promise<infer U>
	? U
	: never
