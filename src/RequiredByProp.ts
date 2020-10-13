/**
 * Make specific properties of a type required.
 *
 * @template Type The type in which to make some properties required.
 * @template Key The properties of the type to make required.
 */
export type RequiredByProp<Type extends object, Key extends keyof Type> = Omit<
	Type,
	Key
> &
	Required<Pick<Type, Key>>
