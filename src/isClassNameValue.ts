type ClassNameValue = ClassNameArray | string | null | undefined | 0 | false
type ClassNameArray = ClassNameValue[]

/**
 * Check whether the passed param is a ClassNameValue. Tailwind's tree shaking requires that you put classes in `className` or `class` props, so passing non-standard class name props breaks it. The work-around is to pass additional classes through objects in the `className` prop.
 * @param param The object or ClassNameValue to check
 * @returns Whether the passed param is a ClassNameValue.
 */
function isClassNameValue(
	param: Record<string, any> | ClassNameValue
): param is ClassNameValue {
	return !(typeof param === "object" && !Array.isArray(param))
}

export default isClassNameValue
