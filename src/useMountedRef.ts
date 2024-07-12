import { useRef } from "react"

import useOnMount from "./useOnMount"
import useOnUnmount from "./useOnUnmount"

/** Get a ref that contains whether the component is currently mounted. */
export default function useMountedRef() {
	const mounted = useRef(false)

	useOnMount(() => (mounted.current = true))
	useOnUnmount(() => (mounted.current = false))

	return mounted as React.RefObject<boolean>
}
