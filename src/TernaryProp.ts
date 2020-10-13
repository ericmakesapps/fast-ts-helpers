import { UnionProp } from "./UnionProp"
import { Key } from "./Key"

export type TernaryProp<P extends Key, T extends object, U> = UnionProp<
	P,
	true,
	T,
	false,
	U
>
