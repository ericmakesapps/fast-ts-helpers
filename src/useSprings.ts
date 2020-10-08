import { CSSProperties } from "react"
import {
	UseSpringProps as ActualUseSpringProps,
	useSprings as actualUseSprings,
	AnimatedValue,
	ForwardedProps
} from "react-spring/web.cjs"

import { SpringConfig } from "./Constants"

export { animated } from "react-spring/web.cjs"

type Merge<A, B> = { [K in keyof A]: K extends keyof B ? B[K] : A[K] } & B
type UseSpringProps<DS extends object> = ActualUseSpringProps<Merge<DS, CSSProperties>>
type OverwriteKeys<A, B> = { [K in keyof A]: K extends keyof B ? B[K] : A[K] }

/**
 * A useSprings with the default config.
 *
 * @param items The items to spring.
 * @returns The props for the springs.
 */
export function useSprings<DS extends object>(items: UseSpringProps<DS>[]) {
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
