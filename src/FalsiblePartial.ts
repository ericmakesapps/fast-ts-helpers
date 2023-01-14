import Falsible from "./Falsible"

/**
 * Represent a type where all of the properties in the type are falsible and optional.
 *
 * @template Type The type whose properties to map to falsible.
 */
type FalsiblePartial<Type extends object> = {
	[P in keyof Type]?: Falsible<Type[P]>
}

export default FalsiblePartial
