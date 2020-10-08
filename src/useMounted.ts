import { useState } from "react"

import { useOnMount } from "./useOnMount"
import { useOnUnmount } from "./useOnUnmount"

/** Updates state whenever this component mounts or unmounts. */
export function useMounted() {
	const [mounted, setMounted] = useState(false)

	useOnMount(() => setMounted(true))
	useOnUnmount(() => setMounted(false))

	return mounted
}
