import Falsible from "./Falsible"

import combine from "./combine"
import onEnterKeyDown from "./onEnterKeyDown"
import memoize from "./memoize"

/**
 * Attach an action to both the onClick and the enter key's actual keypress (ignoring the repeated keydown events if the user holds the enter key).
 *
 * @param action The main action to perform when the user clicks or presses down the enter key.
 * @param extraOnClick An additional listener to attach to the native `Click` event.
 * @param extraOnKeyDown An additional listener to attach to the native `KeyDown` event.
 * @param extraOnKeyUp An additional listener to attach to the native `KeyUp` event.
 * @returns An object containing the callbacks to attach to the element.
 */
const onClickOrEnterKeyDown = memoize(
	(
		action?: Falsible<(event: React.MouseEvent | React.KeyboardEvent) => void>,
		extraOnClick?: Falsible<(event: React.MouseEvent) => void>,
		extraOnKeyDown?: Falsible<(event: React.KeyboardEvent) => void>,
		extraOnKeyUp?: Falsible<(event: React.KeyboardEvent) => void>
	) => {
		return {
			onClick: combine(action, extraOnClick),
			...onEnterKeyDown(action, extraOnKeyDown, extraOnKeyUp)
		}
	}
)

export default onClickOrEnterKeyDown
