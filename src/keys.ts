import KeyOf from "./KeyOf"

/** Get a properly typed keys of the passed object */
function keys<T extends object>(obj: T) {
	return Object.keys(obj) as KeyOf<T>[]
}

export default keys
