import { CSSProperties, useCallback, useRef, useState } from "react"
import {
	useSpring as actualUseSpring,
	useSprings as actualUseSprings,
	AnimatedValue,
	ForwardedProps,
	UseSpringProps
} from "react-spring/web.cjs"

import { areEqual } from "./areEqual"
import { split } from "./split"
import { usePrevious } from "./usePrevious"

import { fallback } from "./fallback"
import { Falsible } from "./Falsible"
import { tuple } from "./tuple"
import { isCallable } from "./isCallable"

export {
	animated,
	AnimatedValue,
	ForwardedProps,
	HooksBaseProps,
	InterpolationChain,
	InterpolationConfig,
	OpaqueInterpolation,
	ReactSpringHook,
	SetUpdateCallbackFn,
	SpringBaseProps,
	SetUpdateFn,
	State,
	TransitionKeyProps,
	UseSpringBaseProps,
	UseSpringProps,
	UseTransitionProps,
	UseTransitionResult,
	config,
	interpolate,
	useChain,
	useTrail
} from "react-spring/web.cjs"

/** The config that the spring hooks use. You can change the values in this object if you want to change the default. */
export const SpringConfig = {
	precision: 0.05,
	clamp: true
}

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

/**
 * Use a spring, but normalize the on rest and stuff.
 *
 * @param values The values for this spring.
 * @returns The props for the spring.
 */
export function useSpring<DS extends object>(
	valuesOrGetter:
		| UseSpringProps<Merge<DS, CSSProperties>>
		| (() => UseSpringProps<Merge<DS, CSSProperties>>)
) {
	const values = isCallable(valuesOrGetter) ? valuesOrGetter() : valuesOrGetter

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

type Merge<A, B> = { [K in keyof A]: K extends keyof B ? B[K] : A[K] } & B
type OverwriteKeys<A, B> = { [K in keyof A]: K extends keyof B ? B[K] : A[K] }

/**
 * A useSprings with the default config.
 *
 * @param items The items to spring.
 * @returns The props for the springs.
 */
export function useSprings<DS extends object>(
	items: UseSpringProps<Merge<DS, CSSProperties>>[]
) {
	return actualUseSprings(
		items.length,
		items.map((item) => ({
			...item,
			config: {
				...SpringConfig,
				...item.config
			}
		}))
	) as AnimatedValue<ForwardedProps<OverwriteKeys<DS, CSSProperties>>>[]
}
