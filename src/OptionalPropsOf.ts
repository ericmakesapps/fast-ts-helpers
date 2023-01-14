/**
 * Extract the optional properties of the passed type.
 *
 * @template Type The type from which to extract the keys of the optional properties.
 */
type OptionalPropsOf<Type extends object> = Exclude<
	{
		[K in keyof Type]: Type extends Record<K, Type[K]> ? never : K
	}[keyof Type],
	undefined
>

export default OptionalPropsOf
