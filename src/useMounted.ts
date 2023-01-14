import { useState } from "react"

import useOnMount from "./useOnMount"
import useOnUnmount from "./useOnUnmount"

/** Updates state whenever this component mounts or unmounts. */
function useMounted() {
	const [mounted, setMounted] = useState(false)

	useOnMount(() => setMounted(true))
	useOnUnmount(() => setMounted(false))

	return mounted
}

export default useMounted
