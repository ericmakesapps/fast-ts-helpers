import FalsibleList from "./FalsibleList"

/**
 * Check whether the passed param is a falsible list of strings. You can pass your class list either directly or through an object easily by using this helper.
 * @param param The object or falsible list of strings to check
 * @returns Whether the passed param is a falsible list of strings.
 */
function isClassesList(
	obj: Record<string, any> | FalsibleList<string>
): obj is FalsibleList<string> {
	return !(typeof obj === "object" && !Array.isArray(obj))
}

export default isClassesList
