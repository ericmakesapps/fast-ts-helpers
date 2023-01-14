/** Get the passed in items as a tuple. */
function tuple<T extends unknown[]>(...args: T): T {
	return args
}

export default tuple
