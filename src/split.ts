import omit from "./omit"
import pick from "./pick"
import tuple from "./tuple"

/**
 * Returns two versions of this object – one where the passed keys are included, and one where the passed keys are omitted.
 *
 * @template Type The type of object from which properties are being picked and omitted.
 * @template Key The keys that should be picked and omitted.
 * @param obj The object to split into picked and omitted versions.
 * @param keys The keys to use to split the object.
 * @returns Two versions of the object, one where only the specified keys are included and one where they are omitted.
 */
function split<Type extends object, Key extends keyof Type>(
	obj: Type,
	...keys: Key[]
): [Pick<Type, Key>, Omit<Type, Key>]
/**
 * Returns two versions of this object – one where the keys matching the passed pattern are included, and one where the keys matching the pattern are omitted.
 *
 * @template Type The type of object from which properties are being picked and omitted.
 * @param obj The object to split into picked and omitted versions.
 * @param pattern The pattern to use to split the object.
 * @returns Two versions of the object, one where only keys matching the RegExp are included and one where they are omitted.
 */
function split<Type extends object>(
	obj: Type,
	pattern: RegExp
): [Partial<Type>, Partial<Type>]

function split<T extends object, K extends keyof T>(obj: T, ...keys: K[]) {
	return tuple(pick(obj, ...keys), omit(obj, ...keys))
}

export default split
