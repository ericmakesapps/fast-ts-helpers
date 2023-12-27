/**
 * Recursively make a type's properties required.
 *
 * @template Type The type whose properties to make required.
 */
type DeepRequired<Type> = Type extends object
	? {
			[P in keyof Type]-?: DeepRequired<Type[P]>
		}
	: NonNullable<Type>

export default DeepRequired
