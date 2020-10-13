/**
 * Represents a version of the passed type where all of the properties are always undefined or omitted.
 *
 * @template Type The type to map.
 */
export type Never<Type extends object> = {
	[P in keyof Type]?: never
}
