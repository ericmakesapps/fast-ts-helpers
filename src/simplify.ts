import { NonFalsible } from "./NonFalsible"
import { OptionalPropsOf } from "./OptionalPropsOf"
import { Falsey } from "./Falsey"
import { fallback } from "./fallback"

/**
 * Map all falsey values in an object to undefined. **Don't** use this on objects that contain booleans, numbers, or strings where `false`, `0`, and/or `""` should retain their value. It will mess it up.
 *
 * @template Type The type of object being simplified down.
 * @param obj The object to simplify.
 * @returns A version of the object where all falsey values are mapped to undefined.
 */
export function simplify<Type extends object>(
	obj: Type
): {
	[K in OptionalPropsOf<Type>]?: NonFalsible<Type[K]>
} &
	{
		[K in Exclude<keyof Type, OptionalPropsOf<Type>>]: Falsey extends Type[K]
			? NonFalsible<Type[K]> | undefined
			: Type[K] extends string | number | boolean
			? NonFalsible<Type[K]> | undefined
			: Type[K]
	} {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const ret: any = {}

	for (const key in obj) {
		const value = obj[key]

		ret[key] = fallback(value, undefined)
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return ret
}
