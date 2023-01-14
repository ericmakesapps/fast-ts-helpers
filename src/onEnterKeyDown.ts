import Falsible from "./Falsible"
import memoize from "./memoize"
import onNonRepeatedKeyDown from "./onNonRepeatedKeyDown"
import truthy from "./truthy"

/**
 * Respond to the event where the user presses the enter key, responding only to the actula press, not the repeated events if the user holds it.
 *
 * @param action The main action to perform when the user presses down the enter key.
 * @param extraOnKeyDown An additional listener to attach to the native `KeyDown` event.
 * @param extraOnKeyUp An additional listener to attach to the native `KeyUp` event.
 * @returns An object containing the callbacks to attach to the element.
 */
const onEnterKeyDown = memoize(
	(
		action?: Falsible<(event: React.KeyboardEvent) => void>,
		extraOnKeyDown?: Falsible<(event: React.KeyboardEvent) => void>,
		extraOnKeyUp?: Falsible<(event: React.KeyboardEvent) => void>
	) => {
		return onNonRepeatedKeyDown(
			(event) => {
				if (event.key === `Enter` && truthy(action)) {
					action(event)
				}
			},
			extraOnKeyDown,
			extraOnKeyUp
		)
	}
)

export default onEnterKeyDown
