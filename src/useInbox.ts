import useMailbox from "./useMailbox"

function useInbox<T>(box: string, defaultValue: T): T
function useInbox<T>(box: string, defaultValue?: T): T | undefined

function useInbox<T>(box: string, defaultValue?: T) {
	const [value = defaultValue] = useMailbox<T>(box)

	return value
}

export default useInbox
