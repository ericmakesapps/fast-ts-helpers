import copy from "copy-to-clipboard"

/**
 * Copies the passed text to the clipboard using the clipboard API if it is available, or falling back to `document.execCommand` if not.
 * @param text The text to copy to the clipboard
 * @returns A promise that resolves to the text that was copied, or rejects on failure.
 */
async function copyToClipboard<T extends string | undefined>(text: T) {
	if (text == null) {
		return
	}

	try {
		await navigator.clipboard.writeText(text)

		return text
	} catch (e) {
		return new Promise<T>((resolve, reject) => {
			if (copy(text)) {
				resolve(text)
			} else {
				reject(`Failed to copy`)
			}
		})
	}
}

export default copyToClipboard
