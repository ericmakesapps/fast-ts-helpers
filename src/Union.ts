import Never from "./Never"
import IdType from "./IdType"

type UnionOf<L, R> = (L & Never<Omit<R, keyof L>>) | (R & Never<Omit<L, keyof R>>)

/**
 * Makes a discriminating union from the passed tuple type of types. All props are available, with unshared properties being optional (or undefined after discrimination).
 *
 * If you have a union type that you to pass through Union, you can use UnionToTuple, but beware that order matters and it is a little unpredictable.
 */
type Union<A extends readonly [...any]> = IdType<
	A extends [infer L, infer R, ...infer RR] ? UnionOf<L, Union<[R, ...RR]>> : A[0]
>

export default Union
