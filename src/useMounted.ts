import { useState } from "react"

import useOnMount from "./useOnMount"

/** Updates state whenever this component mounts or unmounts. */
function useMounted() {
	const [mounted, setMounted] = useState(false)

	useOnMount(() => {
		setMounted(true)

		return () => {
			setMounted(false)
		}
	})

	return mounted
}

export default useMounted
