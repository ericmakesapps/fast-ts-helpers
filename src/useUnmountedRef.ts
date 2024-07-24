import { useRef } from "react"

import useOnUnmount from "./useOnUnmount"

/** Get a ref that contains whether the component has been unmounted. */
export default function useUnmountedRef() {
	const unmounted = useRef(false)

	useOnUnmount(() => (unmounted.current = true))

	return unmounted as React.RefObject<boolean>
}
