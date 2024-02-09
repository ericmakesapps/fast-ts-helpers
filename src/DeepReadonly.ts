/**
 * Recursively make a type's properties readonly.
 *
 * @template Type The type whose properties to make readonly.
 */
type DeepReadonly<Type> =
	Type extends Array<infer Element>
		? ReadonlyArray<DeepReadonly<Element>>
		: Type extends Set<Element>
			? ReadonlySet<Element>
			: Type extends Map<infer Key, infer Value>
				? ReadonlyMap<Key, Value>
				: Type extends Function
					? Type
					: Type extends object
						? {
								readonly [P in keyof Type]: DeepReadonly<Type[P]>
							}
						: Type

export default DeepReadonly
