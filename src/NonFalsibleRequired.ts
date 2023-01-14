import NonFalsible from "./NonFalsible"

/**
 * Make a type's properties required and non-falsible.
 *
 * @template Type The type to map to a required non-falsible type.
 */
type NonFalsibleRequired<Type extends object> = {
	[P in keyof Type]-?: NonFalsible<Type[P]>
}

export default NonFalsibleRequired
