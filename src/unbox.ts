/**
 * Unbox a value or factory into the value itself.
 *
 * @template Type The type of the value contained in the box.
 * @param typeOrFn The value or factory to unbox into an actual value.
 * @returns The value contained in the `ValueOrFactory`.
 */
function unbox<Type>(typeOrFn: Type | (() => Type)): Type {
	return typeof typeOrFn === `function` ? (typeOrFn as () => Type)() : typeOrFn
}

export default unbox
