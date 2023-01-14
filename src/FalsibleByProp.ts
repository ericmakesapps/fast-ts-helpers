import FalsiblePartial from "./FalsiblePartial"

/**
 * Make only specific properties of a type falsible.
 *
 * @template Type The type in which to make some properties falsible.
 * @template Key The properties of the type to make falsible.
 */
type FalsibleByProp<Type extends object, Key extends keyof Type> = Omit<Type, Key> &
	FalsiblePartial<Pick<Type, Key>>

export default FalsibleByProp
