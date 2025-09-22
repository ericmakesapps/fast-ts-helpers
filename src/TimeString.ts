type TimeString =
	| `${number}`
	| `${number}:${number}`
	| `${number}:${number}:${number}`
	| `${number}:${number}:${number}Z`
	| `${number}:${number}:${number}+${number}`
	| `${number}:${number}:${number}-${number}`
	| `${number}:${number}:${number}+${number}:${number}`
	| `${number}:${number}:${number}-${number}:${number}`

export default TimeString
