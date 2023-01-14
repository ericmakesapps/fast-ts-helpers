/**
 * Make only specific properties of a type optional.
 *
 * @template Type The type in which to make some properties optional.
 * @template Key The properties of the type to make optional.
 */
type PartialByProp<Type extends object, Key extends keyof Type> = Omit<Type, Key> &
	Partial<Pick<Type, Key>>

export default PartialByProp
