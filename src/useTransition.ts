import { CSSProperties, useCallback, useState } from "react"
import { fallback } from "./fallback"
import { Falsible, Merge, UseSpringProps } from "./Types"
import { tuple } from "./tuple"
import { useSpring } from "./useSpring"

export { animated } from "./useSpring"

/**
 * Use a react-spring spring to emulate a transition. Their built-in transitions don't work very well in my opinion, but the springs are great. This is the best of both worlds.
 *
 * @param shown Whether the element should currently be shown.
 * @param values The animated values of the element.
 * @returns A tuple containing the condition to use for rendering the component and the props to add to the components style.
 */
export function useTransition<DS extends object>(
	shown: Falsible<boolean>,
	values: UseSpringProps<Merge<DS, CSSProperties>>
) {
	const actualShown = Boolean(shown)
	const [render, setRender] = useState(actualShown)

	if (actualShown && !render) {
		setRender(true)
	}

	const { onRest: passedOnRest } = values

	const onRest = useCallback(
		(ds: Parameters<typeof passedOnRest & CallableFunction>[0]) => {
			passedOnRest?.(ds)

			if (!actualShown) {
				setRender(false)
			}
		},
		[passedOnRest, actualShown]
	)

	return tuple(
		fallback(render, null),
		useSpring({
			...values,
			onRest
		})
	)
}
