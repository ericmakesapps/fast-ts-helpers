import { NonFalsible } from "./NonFalsible"

/**
 * Recursively make a type's properties required and non-falsible.
 *
 * @template Type The type to recursively map to a required non-falsible type.
 */
export type DeepNonFalsibleRequired<Type extends object> = {
	[P in keyof Type]: Type[P] extends object
		? DeepNonFalsibleRequired<Type[P]>
		: NonFalsible<Type[P]>
}
