/**
 * Recursively make a type's properties required.
 *
 * @template Type The type whose properties to make required.
 */
export type DeepRequired<Type extends object> = {
	[P in keyof Type]-?: Type[P] extends object
		? DeepRequired<Type[P]>
		: NonNullable<Type[P]>
}
