/**
 * Extract the optional properties of the passed type.
 *
 * @template Type The type from which to extract the keys of the optional properties.
 */
type OptionalPropsOf<Type> = {
	[K in keyof Type]-?: object extends { [P in K]: Type[K] } ? K : never
}[keyof Type]

export default OptionalPropsOf
