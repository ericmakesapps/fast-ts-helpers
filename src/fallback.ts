import { NonFalsible } from "./Types"

/**
 * Get the first truthy value of the passed values, or falls back to the last value.
 *
 * @param p1 The first passed value.
 * @param p2 The second passed value.
 * @returns The first truthy value of the passed values, or falls back to the last value.
 */
export function fallback<T, U>(p1: T, p2: U): NonFalsible<T> | U
/**
 * Get the first truthy value of the passed values, or falls back to the last value.
 *
 * @param p1 The first passed value.
 * @param p2 The second passed value.
 * @param p3 The third passed value.
 * @returns The first truthy value of the passed values, or falls back to the last value.
 */
export function fallback<T, U>(p1: T, p2: T, p3: U): NonFalsible<T> | U
/**
 * Get the first truthy value of the passed values, or falls back to the last value.
 *
 * @param p1 The first passed value.
 * @param p2 The second passed value.
 * @param p3 The third passed value.
 * @param p4 The fourth passed value.
 * @returns The first truthy value of the passed values, or falls back to the last value.
 */
export function fallback<T, U>(p1: T, p2: T, p3: T, p4: U): NonFalsible<T> | U
/**
 * Get the first truthy value of the passed values, or falls back to the last value.
 *
 * @param p1 The first passed value.
 * @param p2 The second passed value.
 * @param p3 The third passed value.
 * @param p4 The fourth passed value.
 * @param p5 The fifth passed value.
 * @returns The first truthy value of the passed values, or falls back to the last value.
 */
export function fallback<T, U>(p1: T, p2: T, p3: T, p4: T, p5: U): NonFalsible<T> | U
/**
 * Get the first truthy value of the passed values, or falls back to the last value.
 *
 * @param p1 The first passed value.
 * @param p2 The second passed value.
 * @param p3 The third passed value.
 * @param p4 The fourth passed value.
 * @param p5 The fifth passed value.
 * @param p6 The sixth passed value.
 * @returns The first truthy value of the passed values, or falls back to the last value.
 */
export function fallback<T, U>(
	p1: T,
	p2: T,
	p3: T,
	p4: T,
	p5: T,
	p6: U
): NonFalsible<T> | U
/**
 * Get the first truthy value of the passed values, or falls back to the last value.
 *
 * @param p1 The first passed value.
 * @param p2 The second passed value.
 * @param p3 The third passed value.
 * @param p4 The fourth passed value.
 * @param p5 The fifth passed value.
 * @param p6 The sixth passed value.
 * @param p7 The seventh passed value.
 * @returns The first truthy value of the passed values, or falls back to the last value.
 */
export function fallback<T, U>(
	p1: T,
	p2: T,
	p3: T,
	p4: T,
	p5: T,
	p6: T,
	p7: U
): NonFalsible<T> | U
/**
 * Get the first truthy value of the passed values, or falls back to the last value.
 *
 * @param p1 The first passed value.
 * @param p2 The second passed value.
 * @param p3 The third passed value.
 * @param p4 The fourth passed value.
 * @param p5 The fifth passed value.
 * @param p6 The sixth passed value.
 * @param p7 The seventh passed value.
 * @param p8 The eigth passed value.
 * @returns The first truthy value of the passed values, or falls back to the last value.
 */
export function fallback<T, U>(
	p1: T,
	p2: T,
	p3: T,
	p4: T,
	p5: T,
	p6: T,
	p7: T,
	p8: U
): NonFalsible<T> | U

export function fallback<T>(...things: T[]) {
	return things.find(Boolean) ?? things[things.length - 1]
}
