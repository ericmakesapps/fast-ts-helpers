import { Falsible } from "./Falsible"

/**
 * Represents a type where all of its properties and it's properties properties recursively are falsible and optional.
 *
 * @template Type The type to recursively map to falsible and optional.
 */
export type DeepFalsiblePartial<Type extends object> = {
	[P in keyof Type]?: Type[P] extends object
		? DeepFalsiblePartial<Type[P]>
		: Falsible<Type[P]>
}
