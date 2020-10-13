import { Falsible } from "./Falsible"

/**
 * An interface representing the event handlers that should be present on interactible components.
 */
export type EventHandlerComponent<T> = {
	onClick?: Falsible<React.MouseEventHandler<T>>
	onKeyDown?: Falsible<React.KeyboardEventHandler<T>>
	onFocus?: Falsible<React.FocusEventHandler<T>>
	onBlur?: Falsible<React.FocusEventHandler<T>>
	onPointerEnter?: Falsible<React.PointerEventHandler<T>>
	onPointerDown?: Falsible<React.PointerEventHandler<T>>
	onPointerMove?: Falsible<React.PointerEventHandler<T>>
	onPointerUp?: Falsible<React.PointerEventHandler<T>>
	onPointerLeave?: Falsible<React.PointerEventHandler<T>>
}
