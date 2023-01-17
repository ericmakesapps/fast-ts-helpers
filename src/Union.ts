import Never from "./Never"
import IdType from "./IdType"

type UnionOfTwo<First, Second> =
	| (First & Never<Omit<Second, keyof First>>)
	| (Second & Never<Omit<First, keyof Second>>)

/**
 * Makes a discriminating union from the passed tuple type of types. All props are available, with unshared properties being optional (or undefined after discrimination).
 *
 * If you have a literal union type that you want to pass through Union, you can use UnionToTuple, but **beware** that order matters and it is a little unpredictable.
 */
type Union<Types extends [...any]> = IdType<
	Types extends [infer First, infer Second, ...infer Rest]
		? UnionOfTwo<First, Union<[Second, ...Rest]>>
		: Types[0]
>

export default Union
