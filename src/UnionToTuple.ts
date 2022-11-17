import { UnionToIntersection } from "./UnionToIntersection"

type LastOf<T> = UnionToIntersection<
	T extends any ? () => T : never
> extends () => infer R
	? R
	: never

type Push<T extends any[], V> = [...T, V]

/** Turns a union type into a tuple type where the parts of the union are in the tuple. **DO NOT USE THIS TO TYPE A RUNTIME TUPLE**. The compiler may arbitrarily change the order of the items in the tuple, thereby throwing your whole thing off. **DON'T DO IT**. */
export type UnionToTuple<
	T,
	L = LastOf<T>,
	N = [T] extends [never] ? true : false
> = true extends N ? [] : Push<UnionToTuple<Exclude<T, L>>, L>
