import springer from "./springer"

const animateScrollInterpolator = springer(0, 0)

type Animator = (time: number) => boolean

function addAnimator(animator: Animator) {
	window.requestAnimationFrame((now) => animator(now) && addAnimator(animator))
}

export type ScrollOptions = {
	top?: number | undefined
	left?: number | undefined
}

function makeTween(
	start: number,
	end: number,
	duration: number,
	interpolator: (t: number) => number
): (time: number) => number {
	return function tween(time) {
		return (
			(end - start) *
				interpolator(duration > 0 ? Math.max(0, Math.min(1, time / duration)) : 1) +
			start
		)
	}
}

async function animateScrollTo(
	elementOrOptions: HTMLElement | ScrollOptions,
	options?: ScrollOptions
) {
	const element = !options ? document.documentElement : (elementOrOptions as HTMLElement)
	const { top, left } = !options ? (elementOrOptions as ScrollOptions) : options

	const promises: Promise<void>[] = []
	const startTime = performance.now()

	if (typeof top === `number`) {
		const maxTop =
			element.scrollHeight -
			(element === document.documentElement ? window.innerHeight : element.offsetHeight)
		const start = element.scrollTop
		const end = Math.min(Math.round(top), maxTop)
		const duration = Math.abs(end - start) / 5 + 1000
		const tween = makeTween(start, end, duration, animateScrollInterpolator)

		let expected: number

		promises.push(
			new Promise((resolve, reject) => {
				addAnimator((time) => {
					const current = element.scrollTop
					const newScroll = Math.round(tween(time - startTime))

					if (expected == null) {
						expected = current
					}

					if (time > startTime + duration || element.scrollTop === end) {
						resolve()

						element.scrollTop = end
					} else if (current === expected) {
						element.scrollTop = newScroll

						expected = element.scrollTop

						return true
					}

					reject(`Scroll was cancelled`)

					return false
				})
			})
		)
	}

	if (typeof left === `number`) {
		const maxLeft =
			element.scrollWidth -
			(element === document.documentElement ? window.innerWidth : element.offsetWidth)
		const start = element.scrollLeft
		const end = Math.min(Math.round(left), maxLeft)
		const duration = Math.abs(end - start) / 5 + 1000
		const tween = makeTween(start, end, duration, animateScrollInterpolator)

		let expected: number

		promises.push(
			new Promise((resolve, reject) => {
				addAnimator((time) => {
					const current = element.scrollLeft
					const newScroll = Math.round(tween(time - startTime))

					if (expected == null) {
						expected = current
					}

					if (time > startTime + duration || element.scrollLeft === end) {
						element.scrollLeft = end

						resolve()
					} else if (current === expected) {
						element.scrollLeft = newScroll

						expected = element.scrollLeft

						return true
					}

					reject()

					return false
				})
			})
		)
	}

	return Promise.all(promises).then(() => undefined)
}

export default animateScrollTo
