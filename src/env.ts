declare const process:
	| {
			env: Record<string, string | undefined>
	  }
	| undefined

function get<T>(
	parser: (val: string) => T
): {
	(name: string, defaultTo: T): T
	(name: string, defaultTo?: T): T | undefined
} {
	if (typeof process === `undefined`) {
		// @ts-expect-error
		return (_: string, defaultTo?: T) => defaultTo
	}

	// @ts-expect-error
	return (name: string, defaultTo?: T) => {
		const value = process.env[name]

		return value !== undefined ? parser(value) : defaultTo
	}
}

export const env = {
	str: get((val) => val),
	int: get((val) => parseInt(val, 10)),
	float: get((val) => parseFloat(val)),
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	json: get((val) => JSON.parse(val)) as {
		<T extends {}>(name: string, defaultTo: T): T
		<T extends {}>(name: string, defaultTo?: T): T | undefined
	}
} as const
