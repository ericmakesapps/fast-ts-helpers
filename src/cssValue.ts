export type CssPropertyValueType = "string" | "float" | "int" | "boolean"

type PropParams = {
	pseudo?: string
	prop: string
	type?: CssPropertyValueType
}

type StringProp = {
	type?: "string"
} & PropParams

type NumberProp = {
	type: "float" | "int"
} & PropParams

type BooleanProp = {
	type: "boolean"
} & PropParams

/**
 * Get the computed css value of some prop on the body element.
 *
 * @param options The value to get.
 * @returns The computed value.
 */
export function cssValue({ pseudo, prop, type }: StringProp): string
/**
 * Get the computed css value of some prop on the body element.
 *
 * @param options The value to get.
 * @returns The computed value.
 */
export function cssValue({ pseudo, prop, type }: NumberProp): number
/**
 * Get the computed css value of some prop on the body element.
 *
 * @param options The value to get.
 * @returns The computed value.
 */
export function cssValue({ pseudo, prop, type }: BooleanProp): boolean
/**
 * Get the computed css value of some prop of the passed element.
 *
 * @param element The element whose computed value to get.
 * @param options The value to get.
 * @returns The computed value.
 */
export function cssValue(element: HTMLElement, { pseudo, prop, type }: StringProp): string
/**
 * Get the computed css value of some prop of the passed element.
 *
 * @param element The element whose computed value to get.
 * @param options The value to get.
 * @returns The computed value.
 */
export function cssValue(element: HTMLElement, { pseudo, prop, type }: NumberProp): number
/**
 * Get the computed css value of some prop of the passed element.
 *
 * @param element The element whose computed value to get.
 * @param options The value to get.
 * @returns The computed value.
 */
export function cssValue(
	element: HTMLElement,
	{ pseudo, prop, type }: BooleanProp
): boolean

export function cssValue(
	element: HTMLElement | PropParams = document.body,
	params?: PropParams
) {
	const { type, prop, pseudo } = params ?? (element as PropParams)

	if (typeof params !== `object`) {
		element = document.body
	}

	let response = getComputedStyle(element as HTMLElement, pseudo).getPropertyValue(prop)

	// Tidy up the string if there's something to work with
	if (response.length > 0) {
		response = response.replace(/'|"/g, ``).trim()
	}

	// Convert the response into a whatever type we wanted
	// eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
	switch (type) {
		case `int`:
			return parseInt(response, 10)
		case `float`:
			return parseFloat(response)
		case `boolean`:
			return response === `true` || response === `1`
	}

	// Return the string response by default
	return response
}
