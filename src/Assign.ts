import IdType from "./IdType"
import OptionalPropsOf from "./OptionalPropsOf"

type MergeAsOptional<L, R, K extends keyof L & keyof R> = {
	[P in K]?: L[P] | R[P]
}

type MergeAsRequired<L, R, K extends keyof L & keyof R> = {
	[P in K]: L[P] | Exclude<R[P], undefined>
}

type AssignTwo<L, R> = Pick<L, Exclude<keyof L, keyof R>> &
	MergeAsOptional<L, R, OptionalPropsOf<L> & OptionalPropsOf<R>> &
	MergeAsRequired<L, R, Exclude<keyof L, OptionalPropsOf<L>> & OptionalPropsOf<R>> &
	Pick<R, Exclude<keyof R, keyof L & OptionalPropsOf<R>>>

/**
 * Combine the passed type, in the way that `Object.assign` combines objects. The first
 *   type is the base, and the second type is the one that is merged into it. If there are
 *   any shared properties, the second type's property will overwrite the first type's
 *   property. Optional properties on the second type will only add to the type of the
 *   base, whereas required props will overwrite the base's type.
 */
type Assign<A extends readonly [...any]> = A extends [infer L, ...infer R]
	? IdType<AssignTwo<L, Assign<R>>>
	: unknown

export default Assign
