export type Orientation = "portrait" | "landscape"

export function checkBounds(
	width: number,
	bounds: [number, number],
	orientation?: Orientation
): boolean {
	const mid = Math.round((bounds[1] - bounds[0]) / 2)

	return !Boolean(orientation)
		? bounds[0] <= width && width <= bounds[1]
		: orientation === `portrait`
		? checkBounds(width, [bounds[0], mid])
		: checkBounds(width, [mid + 1, bounds[1]])
}
