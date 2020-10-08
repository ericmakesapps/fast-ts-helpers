import { useCallback, useRef } from "react"
import { useSpring as actualUseSpring } from "react-spring/web.cjs"

import { SpringConfig } from "./Constants"
import { areEqual } from "./areEqual"
import { split } from "./split"
import { usePrevious } from "./usePrevious"
import { UseSpringProps } from "./Types"

export { animated } from "react-spring/web.cjs"

/**
 * Use a spring, but normalize the on rest and stuff.
 *
 * @param values The values for this spring.
 * @returns The props for the spring.
 */
export function useSpring<DS extends object>(values: UseSpringProps<DS>) {
	const [{ onRest: passedOnRest, onStart: passedOnStart }, testValues] = split(
		values,
		`onRest`,
		`onStart`,
		`immediate`,
		`reset`,
		`config`,
		`delay`
	)
	const previousValues = usePrevious(testValues)
	const animating = useRef(false)

	const onStart = useCallback(() => {
		if (!animating.current && !areEqual(testValues, previousValues)) {
			animating.current = true

			passedOnStart?.()
		}
	}, [passedOnStart, previousValues, testValues])

	const onRest = useCallback(
		(ds: Parameters<typeof passedOnRest & CallableFunction>[0]) => {
			if (animating.current) {
				animating.current = false

				passedOnRest?.(ds)
			}
		},
		[passedOnRest]
	)

	return actualUseSpring({
		...values,
		onRest,
		onStart,
		config: {
			...SpringConfig,
			...values.config
		}
	})
}
