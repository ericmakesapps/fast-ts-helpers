import { Falsible } from "./Falsible"

export function truthy<T>(value?: Falsible<T>): value is T {
	return Boolean(value)
}
