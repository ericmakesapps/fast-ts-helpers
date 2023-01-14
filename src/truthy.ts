import Falsible from "./Falsible"

function truthy<T>(value?: Falsible<T>): value is T {
	return Boolean(value)
}

export default truthy
