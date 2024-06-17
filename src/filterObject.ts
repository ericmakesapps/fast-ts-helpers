import Falsey from "./Falsey"
import IdType from "./IdType"
import NonFalsible from "./NonFalsible"

// Utility type to filter properties
type DefinitelyTruthyProps<T> = Exclude<
	{
		[K in keyof T]: Extract<T[K], string | number | boolean | Falsey> extends never
			? K
			: never
	}[keyof T],
	undefined
>

type DefinitelyFalseyProps<T> = Exclude<
	{
		[K in keyof T]: T[K] extends Falsey ? K : never
	}[keyof T],
	undefined
>

// Utility type to make properties optional if they could be falsey
type MaybeFalseyProps<T> = Exclude<
	{
		[K in keyof T]: T[K] extends string | number | boolean | object | null | undefined
			? K
			: never
	}[keyof T],
	DefinitelyFalseyProps<T> | undefined
>

// Utility type to exclude falsey properties and make optional properties that could be falsey
type FilteredObject<T> = IdType<
	{
		[K in DefinitelyTruthyProps<T>]: T[K]
	} & {
		[K in MaybeFalseyProps<T>]?: NonFalsible<T[K]>
	}
>

/**
 * Filter out all falsey values from the passed object. This will filter out `0`s, `NaN`s,
 *   `""`s, `false`s, `null`s, and `undefined`s. Don't use this if you need to retain any
 *   of these values.
 *
 * @template Type The type of the elements in the array.
 * @param object The object to filter.
 * @returns A copy of the passed object with all falsey properties filtered out.
 */
function filterObject<Type extends object>(object: Type): FilteredObject<Type> {
	const clonedObject: any = {}

	for (const key of [
		...Object.getOwnPropertyNames(object),
		...Object.getOwnPropertySymbols(object)
	] as (keyof Type)[]) {
		if (object[key]) {
			clonedObject[key] = object[key]
		}
	}

	return clonedObject
}

export default filterObject
