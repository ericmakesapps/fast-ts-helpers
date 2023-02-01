/**
 * Recursively make a type's properties optional.
 *
 * @template Type The type whose properties to make optional.
 */
type DeepPartial<Type> = Type extends object
	? {
			[P in keyof Type]?: DeepPartial<Type[P]>
	  }
	: Type | undefined

export default DeepPartial
