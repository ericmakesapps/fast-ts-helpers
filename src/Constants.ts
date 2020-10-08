export const focusableSelector =
	`a:not([tabindex^="-"]):not([tabindex=""]):not([disabled]),` +
	`area:not([tabindex^="-"]):not([tabindex=""]):not([disabled]),` +
	`button:not([tabindex^="-"]):not([tabindex=""]):not([disabled]),` +
	`input:not([tabindex^="-"]):not([tabindex=""]):not([disabled]),` +
	`object:not([tabindex^="-"]):not([tabindex=""]):not([disabled]),` +
	`select:not([tabindex^="-"]):not([tabindex=""]):not([disabled]),` +
	`textarea:not([tabindex^="-"]):not([tabindex=""]):not([disabled]),` +
	`[tabindex]:not([tabindex^="-"]):not([tabindex=""])`

/** The screen width at which the screen switches to tablet mode. */
export const tabletBreakpoint = 1024

/** The screen width at which the screen switches to mobile mode. */
export const mobileBreakpoint = 767

/** Whether we are currently running on local host (according to the URL). */
export const isLocal = /localhost|127.0.0.1|0.0.0.0/.test(document.location.hostname)

/** The config that the spring hooks use. You can chang ethe values in this object if you want to change the default. */
export const SpringConfig = {
	precision: 0.05,
	clamp: true
}
