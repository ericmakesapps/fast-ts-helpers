/** A selector that grabs most, if not all, selectable elements. */
export const focusableSelector =
	`a:not([tabindex^="-"]):not([tabindex=""]):not([disabled]),` +
	`area:not([tabindex^="-"]):not([tabindex=""]):not([disabled]),` +
	`button:not([tabindex^="-"]):not([tabindex=""]):not([disabled]),` +
	`input:not([tabindex^="-"]):not([tabindex=""]):not([disabled]),` +
	`object:not([tabindex^="-"]):not([tabindex=""]):not([disabled]),` +
	`select:not([tabindex^="-"]):not([tabindex=""]):not([disabled]),` +
	`textarea:not([tabindex^="-"]):not([tabindex=""]):not([disabled]),` +
	`[tabindex]:not([tabindex^="-"]):not([tabindex=""])`
