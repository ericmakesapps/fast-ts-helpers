/** Turn a union type into an intersection type */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
	k: infer I
) => void
	? I
	: never

export default UnionToIntersection
