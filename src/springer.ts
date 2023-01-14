// MIT License

// Copyright (c) 2016 Tanner Linsley

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const msPerFrame = 16
const sampleDuration = 10000
const sampleMsPerFrame = msPerFrame / sampleDuration
const reusedTuple: [number, number] = [0, 0]

/**
 * Create an interpolator that follows spring physics.
 *
 * @param tension The tension of the spring (force it starts with). Defaults to `0`.
 * @param wobble The wobble of the spring. Defaults to `0`.
 * @returns An interpolator with the passed configurations.
 */
function springer(tension = 0, wobble = 0) {
	const stiffness = Math.min(Math.max(350 * tension, 20), 350)
	const damping = Math.min(Math.max(40 - 40 * wobble, 1), 40)
	const steps: number[] = []

	let progress = 0
	let velocity = 0

	while (progress !== sampleDuration || velocity !== 0) {
		;[progress, velocity] = stepper(
			progress,
			sampleDuration,
			velocity,
			stiffness,
			damping
		)
		steps.push(progress / sampleDuration)
	}

	return (i: number) => {
		return steps[Math.ceil(i * (steps.length - 1))]
	}
}

// Inspired by https://github.com/chenglou/react-motion/blob/master/src/stepper.js
function stepper(
	value: number,
	destination: number,
	velocity: number,
	stiffness: number,
	damping: number
) {
	const spring = -stiffness * (value - destination)
	const damper = -damping * velocity
	const a = spring + damper
	const newVelocity = velocity + a * sampleMsPerFrame
	const newValue = value + newVelocity * sampleMsPerFrame

	if (Math.abs(newVelocity) < 1 && Math.abs(newValue - destination) < 1) {
		reusedTuple[0] = destination
		reusedTuple[1] = 0

		return [destination, 0] as [number, number]
	}

	reusedTuple[0] = newValue
	reusedTuple[1] = newVelocity

	return reusedTuple
}

export default springer
