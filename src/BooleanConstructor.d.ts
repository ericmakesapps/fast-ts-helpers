import { NonFalsible } from "./NonFalsible"

declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface BooleanConstructor {
		// eslint-disable-next-line @typescript-eslint/prefer-function-type
		<T>(value?: T): value is NonFalsible<T>
	}
}
