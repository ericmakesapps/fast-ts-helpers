import { Never } from "./Never"

/**
 * Represents a smarter discriminating union between types. All props are available, with unshared properties being optional (or undefined after discrimination). Supports up to a 9-way union. If you need more, submit an issue.
 */
export type UnionType<
	T1 extends Record<string, any>,
	T2 extends Record<string, any> = T1,
	T3 extends Record<string, any> = T1 & T2,
	T4 extends Record<string, any> = T1 & T2 & T3,
	T5 extends Record<string, any> = T1 & T2 & T3 & T4,
	T6 extends Record<string, any> = T1 & T2 & T3 & T4 & T5,
	T7 extends Record<string, any> = T1 & T2 & T3 & T4 & T5 & T6,
	T8 extends Record<string, any> = T1 & T2 & T3 & T4 & T5 & T6 & T7,
	T9 extends Record<string, any> = T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8
> =
	| (T1 & Never<Omit<T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9, keyof T1>>)
	| (T2 & Never<Omit<T1 & T3 & T4 & T5 & T6 & T7 & T8 & T9, keyof T2>>)
	| (T3 & Never<Omit<T1 & T2 & T4 & T5 & T6 & T7 & T8 & T9, keyof T3>>)
	| (T4 & Never<Omit<T1 & T2 & T3 & T5 & T6 & T7 & T8 & T9, keyof T4>>)
	| (T5 & Never<Omit<T1 & T2 & T3 & T4 & T6 & T7 & T8 & T9, keyof T5>>)
	| (T6 & Never<Omit<T1 & T2 & T3 & T4 & T5 & T7 & T8 & T9, keyof T6>>)
	| (T7 & Never<Omit<T1 & T2 & T3 & T4 & T5 & T6 & T8 & T9, keyof T7>>)
	| (T8 & Never<Omit<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T9, keyof T8>>)
	| (T9 & Never<Omit<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8, keyof T9>>)
