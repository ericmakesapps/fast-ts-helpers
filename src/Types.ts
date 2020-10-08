import { CSSProperties, MutableRefObject } from "react"
import { UseSpringProps as ActualUseSpringProps } from "react-spring"

declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface BooleanConstructor {
		// eslint-disable-next-line @typescript-eslint/prefer-function-type
		<T>(value?: T): value is NonFalsible<T>
	}
}

/** All of the falsey types in JavaScript in one type. */
export type Falsey = undefined | false | 0 | "" | null | void

/**
 * Allows any falsey values to be used as part of an optional property, not just undefined.
 *
 * @template Type The type to make optional.
 */
export type Falsible<Type> = Type | Falsey

/**
 * Exclude falsey values from the passed type.
 *
 * @template Type The type to make non-optional.
 */
export type NonFalsible<Type> = Exclude<Type, Falsey>

/**
 * Represents the passed type itself, or a recursive list of lists of that type.
 *
 * @template Type The type contained by this nestable list.
 */
export type NestableList<Type> = Type | NestableList<Type>[]

/**
 * A falsible version of the passed type or a recursive list of lists of a falsible version of that type.
 *
 * @template Type The type contained by this falsible nested list.
 */
export type FalsibleList<T> = NestableList<Falsible<T>>

/**
 * A RefObject that is readonly. React's default includes null, sillily.
 *
 * @template Type The type pointed to by this ref object.
 */
export type ReadonlyRefObject<T> = Readonly<MutableRefObject<T>>

/** A helper type for a props that can have a `className`. */
export type ClassNameable = {
	className?: FalsibleList<string>
}

/** A helper type for a props that can have a `style`. */
export type Styleable = {
	style?: React.CSSProperties
}

/**
 * Remove the readonly modifier from all the properties of `Type`.
 *
 * @template Type The type to make writable.
 */
export type Writable<Type> = { -readonly [K in keyof Type]: Type[K] }

export type UnionProp<
	P extends Key,
	T1,
	V1,
	T2,
	V2 = void,
	T3 = void,
	V3 = void,
	T4 = void,
	V4 = void,
	T5 = void,
	V5 = void
> =
	| ({ [K in P]: T1 } & V1)
	| (V2 extends void ? { [K in P]: T2 } & {} : { [K in P]: T2 } & V2)
	| (T3 | V3 extends void
			? { [K in P]: T1 } & V1
			: V3 extends void
			? { [K in P]: T3 }
			: { [K in P]: T3 } & V3)
	| (T4 | V4 extends void
			? { [K in P]: T1 } & V1
			: V4 extends void
			? { [K in P]: T4 }
			: { [K in P]: T4 } & V4)
	| (T5 | V5 extends void
			? { [K in P]: T1 } & V1
			: V5 extends void
			? { [K in P]: T5 }
			: { [K in P]: T5 } & V5)

export type TernaryProp<P extends Key, T extends object, U> = UnionProp<
	P,
	true,
	T,
	false,
	U
>

export type Optional<T> = T | undefined | null | false | 0 | ``
export type NonOptional<T> = Exclude<T, undefined | null | false | 0 | ``>
export type Loadable<T extends object> = IfPropIsTrue<"loaded", T>
export type Omit<T, K extends Key> = Pick<T, Exclude<keyof T, K>>

export type TypeOrFn<T> = T | (() => T)

export type Require<T, K extends keyof T> = Omit<T, K> & { [P in K]: NonNullable<T[P]> }
export type PartialProps<T, K extends keyof T> = Omit<T, K> & { [P in K]?: T[P] }

export type ValueOf<T extends {}> = T[keyof T]
export type Unpacked<T> = T extends (infer U)[]
	? U
	: // tslint:disable-next-line: no-any
	T extends (...args: any[]) => infer V
	? V
	: T extends Promise<infer W>
	? W
	: T

/** The type of a property key to an object. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Key = keyof any

/**
 * Represents the value itself, or a function that returns the value. This doesn't work with function types (unboxing would be hard!).
 *
 * @template Type The type to map.
 */
export type ValueOrFactory<Type> = Type | (() => Type)

/**
 * Represents a version of the passed type where all of the properties are always undefined or omitted.
 *
 * @template Type The type to map.
 */
export type Never<Type extends object> = { [P in keyof Type]?: never }

/**
 * Represents a union between two types where the unshared properties are present on both, but undefined and optional where applicable.
 *
 * @template Type1 The first object in the union.
 * @template Type2 The second object in the union.
 */
export type UnionType<Type1 extends object, Type2 extends object> =
	| (Type1 & Never<Omit<Type2, keyof Type1>>)
	| (Type2 & Never<Omit<Type1, keyof Type2>>)

/**
 * Represents a union between two types that hinges on the type of a given property. If the value of `Property` extends `Value1`, then the returned type will extend `Type1`. If the value of `Property` extends `Value2`, then the property will extend `Type2`.
 *
 * @template Property The key that is the hinge for this union
 * @template Value1 The first property type to use as the check.
 * @template Type1 The type to return if the value of `Property` extends `Type1`.
 * @template Value2 The second property type to use as the check.
 * @template Type2 The type to return if the value of `Property` extends `Type2`.
 */
export type UnionByProp<
	Property extends Key,
	Value1,
	Type1 extends object,
	Value2,
	Type2 extends object
> =
	| ({ [K in Property]: Value1 } & Type1 & Never<Omit<Type2, keyof Type1>>)
	| ({ [K in Property]: Value2 } & Type2 & Never<Omit<Type1, keyof Type2>>)

/**
 * Represents a type equivalent `TypeIfTrue` if the value of `Property` is `true` or `TypeIfFalse` if the value of `Property` is `false`.
 *
 * @template Property The property to use as the hinge for this type.
 * @template TypeIfTrue The type to return if the value of `Property` is `true`.
 * @template TypeIfFalse The type to return if the value of `Property` is `false`.
 */
export type TernaryByProp<
	Property extends Key,
	TypeIfTrue extends object,
	TypeIfFalse extends object
> = UnionByProp<Property, true, TypeIfTrue, false, TypeIfFalse>

/**
 * Represents a type that has the properties in Type if the value of `Property` extends `Value`, otherwise will not if the value extends `FallbackValue`.
 *
 * @template Property The property to serve as the hinge of this type.
 * @template Value The value with which the type should be applied.
 * @template Type The type whose properties depend on the value of `Property`
 * @template FallbackValue The alternate value for `Property`.
 */
export type IfPropExtends<
	Property extends Key,
	Value,
	Type extends object,
	FallbackValue
> =
	| ({ [K in Property]: Value } & Type)
	| ({ [K in Property]: FallbackValue } & Never<Type>)

/**
 * Represents a type that will have the properties in `Type` if the value of `Property` is `true`.
 *
 * @template Property The property to use as the hinge for this type.
 * @template Type The type that will be returned if the value of `Property` is `true`.
 */
export type IfPropIsTrue<Property extends Key, Type extends object> = TernaryByProp<
	Property,
	Type,
	Never<Type>
>

/**
 * Represents a type that will have the properties in `Type` if the value of `Property` is `false`.
 *
 * @template Property The property to use as the hinge for this type.
 * @template Type The type that will be returned if the value of `Property` is `false`.
 */
export type IfPropIsFalse<Property extends Key, Type extends object> = TernaryByProp<
	Property,
	Never<Type>,
	Type
>

/**
 * Represents a type that hinges on a `error` property. If and only if `error` is not defined will the values of `Type` will be present.
 *
 * @template Type The type to use for this errorable type.
 */
export type Errorable<Type extends object> = UnionType<{ error: true }, Type>

/**
 * Represents a type that hinges on an `error` property where `error` is a string if it is present. If and only if `error` is not defined will the values of `Type` be present.
 *
 * @template Type The type to use for this error codable type.
 */
export type ErrorCodable<Type extends object> = UnionType<{ error: string }, Type>

/**
 * Represent a type where all of the properties in the type are falsible and optional.
 *
 * @template Type The type whose properties to map to falsible.
 */
export type FalsiblePartial<Type extends object> = {
	[P in keyof Type]?: Falsible<Type[P]>
}

/**
 * Represents a type where all of its properties and it's properties properties recursively are falsible and optional.
 *
 * @template Type The type to recursively map to falsible and optional.
 */
export type DeepFalsiblePartial<Type extends object> = {
	[P in keyof Type]?: Type[P] extends object
		? DeepFalsiblePartial<Type[P]>
		: Falsible<Type[P]>
}

/**
 * Make a type's properties required and non-falsible.
 *
 * @template Type The type to map to a required non-falsible type.
 */
export type NonFalsibleRequired<Type extends object> = {
	[P in keyof Type]-?: NonFalsible<Type[P]>
}

/**
 * Recursively make a type's properties required and non-falsible.
 *
 * @template Type The type to recursively map to a required non-falsible type.
 */
export type DeepNonFalsibleRequired<Type extends object> = {
	[P in keyof Type]: Type[P] extends object
		? DeepNonFalsibleRequired<Type[P]>
		: NonFalsible<Type[P]>
}

/**
 * Recursively make a type's properties required.
 *
 * @template Type The type whose properties to make required.
 */
export type DeepRequired<Type extends object> = {
	[P in keyof Type]-?: Type[P] extends object
		? DeepRequired<Type[P]>
		: NonNullable<Type[P]>
}

/**
 * Recursively make a type's properties optional.
 *
 * @template Type The type whose properties to make optional.
 */
export type DeepPartial<Type extends object> = {
	[P in keyof Type]?: Type[P] extends object ? DeepPartial<Type[P]> : Type[P]
}

/**
 * Make only specific properties of a type falsible.
 *
 * @template Type The type in which to make some properties falsible.
 * @template Key The properties of the type to make falsible.
 */
export type FalsibleByProp<Type extends object, Key extends keyof Type> = Omit<
	Type,
	Key
> &
	FalsiblePartial<Pick<Type, Key>>

/**
 * Make only specific properties of a type optional.
 *
 * @template Type The type in which to make some properties optional.
 * @template Key The properties of the type to make optional.
 */
export type PartialByProp<Type extends object, Key extends keyof Type> = Omit<Type, Key> &
	Partial<Pick<Type, Key>>

/**
 * Make specific properties of a type required.
 *
 * @template Type The type in which to make some properties required.
 * @template Key The properties of the type to make required.
 */
export type RequireByProp<Type extends object, Key extends keyof Type> = Omit<Type, Key> &
	Required<Pick<Type, Key>>

/**
 * Extract the generic type from an array or a promise.
 *
 * @template Type The type from which to extract the generic type.
 */
export type GetType<Type> = Type extends (infer U)[]
	? U
	: Type extends Promise<infer U>
	? U
	: never

/**
 * An interface representing the event handlers that should be present on interactible components.
 */
export type EventHandlerComponent<T> = {
	onClick?: Falsible<React.MouseEventHandler<T>>
	onKeyDown?: Falsible<React.KeyboardEventHandler<T>>
	onFocus?: Falsible<React.FocusEventHandler<T>>
	onBlur?: Falsible<React.FocusEventHandler<T>>
	onPointerEnter?: Falsible<React.PointerEventHandler<T>>
	onPointerDown?: Falsible<React.PointerEventHandler<T>>
	onPointerMove?: Falsible<React.PointerEventHandler<T>>
	onPointerUp?: Falsible<React.PointerEventHandler<T>>
	onPointerLeave?: Falsible<React.PointerEventHandler<T>>
}

export type KeyOf<Type extends object> = Stringlike<keyof Type>

/**
 * Get the string-like version of the passed key. E.g., `0` -> `"0"`.
 *
 * @template Key The key to map to its string-like version.
 */
export type Stringlike<Key> = Key extends string
	? Key
	: Key extends number
	? StringForNumber[Key]
	: string

type StringForNumber = {
	0: `0`
	1: `1`
	2: `2`
	3: `3`
	4: `4`
	5: `5`
	6: `6`
	7: `7`
	8: `8`
	9: `9`
	10: `10`
	100: `100`
	1234: `1234`
	[n: number]: string
}

/**
 * Extract the types from `Base` that extend the `Condition`.
 *
 * @template Base The base type to extract from.
 * @template Condition The type to use as the condition for the extraction.
 */
export type SubType<Base extends object, Condition> = Pick<
	Base,
	{
		[Key in keyof Base]: Base[Key] extends Condition ? Key : never
	}[keyof Base]
>

/**
 * Represents a type that either conforms to the passed type, or doesn't.
 *
 * @template Type The type to use for the representation.
 */
export type AllOrNone<Type extends object> = Type | Never<Type>

/**
 * Extract the optional properties of the passed type.
 *
 * @template Type The type from which to extract the keys of the optional properties.
 */
export type OptionalPropsOf<Type extends object> = Exclude<
	{
		[K in keyof Type]: Type extends Record<K, Type[K]> ? never : K
	}[keyof Type],
	undefined
>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Func<Args extends any[] = any[], Ret = any> = (...args: Args) => Ret

export type Merge<A, B> = { [K in keyof A]: K extends keyof B ? B[K] : A[K] } & B
export type UseSpringProps<DS extends object> = ActualUseSpringProps<
	Merge<DS, CSSProperties>
>
