import combine from "./combine"
import deleteOwnProperties from "./deleteOwnProperties"
import Falsible from "./Falsible"
import memoize from "./memoize"
import truthy from "./truthy"

/** The keys that are currently pressed. */
const keysDown: Record<string, boolean> = {}

/**
 * Use this to respond to only the first keydown until the key is released. Natively the keydown event is repeated over and over until the user releases the key. It's a little silly there isn't a non-repeated option. This has an issue with the meta key, which prevents keyup from being fired. So if you release meta, we will clear all key downs, so it may result in duplication.
 *
 * @param action The main action to perform when the user presses down a key.
 * @param extraOnKeyDown An additional listener to attach to the native `KeyDown` event.
 * @param extraOnKeyUp An additional listener to attach to the native `KeyUp` event.
 * @returns An object containing the callbacks to attach to the element.
 */
const onNonRepeatedKeyDown = memoize(
	(
		action?: Falsible<(event: React.KeyboardEvent) => void>,
		extraOnKeyDown?: Falsible<(event: React.KeyboardEvent) => void>,
		extraOnKeyUp?: Falsible<(event: React.KeyboardEvent) => void>
	) => {
		return {
			onKeyDown: combine(
				truthy(action) &&
					((event: React.KeyboardEvent) => {
						if (!keysDown[event.key]) {
							keysDown[event.key] = true

							action(event)
						}
					}),
				extraOnKeyDown
			),
			onKeyUp: combine(
				truthy(action) &&
					((event: React.KeyboardEvent) => {
						if (event.key === `Meta`) {
							deleteOwnProperties(keysDown)
						}

						delete keysDown[event.key]
					}),
				extraOnKeyUp
			)
		}
	}
)

export default onNonRepeatedKeyDown
