/**
 * Generates a random number from a Gaussian distribution with the specified mean and standard deviation.
 *
 * @param mean The mean of the Gaussian distribution. Defaults to `0`.
 * @param std The standard deviation of the Gaussian distribution. Defaults to `1`.
 * @returns A random number from the Gaussian distribution.
 */
function gaussRand(mean = 0, std = 1) {
	const u = 1 - Math.random() // Converting [0,1) to (0,1]
	const v = Math.random()
	const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)

	// Transform to the desired mean and standard deviation:
	return z * std + mean
}

export default gaussRand
