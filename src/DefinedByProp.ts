import IdType from "./IdType"

/**
 * Make specific properties of a type defined and required.
 *
 * @template Type The type in which to make some properties required.
 * @template Key The properties of the type to make required.
 */
type DefinedByProp<Type extends object, Key extends keyof Type> = IdType<
	Type & { [K in keyof Type & Key]-?: {} }
>

export default DefinedByProp
