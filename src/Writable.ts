/**
 * Remove the readonly modifier from all the properties of `Type`.
 *
 * @template Type The type to make writable.
 */
export type Writable<Type> = {
	-readonly [K in keyof Type]: Type[K]
}
