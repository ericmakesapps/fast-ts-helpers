/**
 * Make specific properties of a type optional and potentially undefined.
 *
 * @template Type The type in which to make some properties optional and potentially undefined.
 * @template Key The properties of the type to make optional and potentially undefined.
 */
type PartialByProp<Type extends object, Key extends keyof Type> = Omit<Type, Key> & {
	[P in Key]?: Type[P] | undefined
}

export default PartialByProp
