import IdType from "./IdType"

type MergeTwo<First, Second> = Partial<
	Omit<First, keyof Second> & Omit<Second, keyof First>
> & {
	[SharedKey in keyof Second & keyof First]: First[SharedKey] | Second[SharedKey]
}

/**
 * Merge together the types in this tuple type of types, turning the shared properties into union typed props and non-shared properties into optional props.
 *
 * If you have a literal union type that you to Merge, you can use UnionToTuple, but **beware** that order matters and it is a little unpredictable.
 */
type Merge<Types extends [...any]> = IdType<
	Types extends [infer First, infer Second, ...infer Rest]
		? MergeTwo<First, Merge<[Second, ...Rest]>>
		: Types[0]
>

export default Merge
