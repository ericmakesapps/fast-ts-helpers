import { useMailbox } from "./useMailbox"

export function useInbox<T>(box: string, defaultValue: T): T
export function useInbox<T>(box: string, defaultValue?: T): T | undefined

export function useInbox<T>(box: string, defaultValue?: T) {
	const [value = defaultValue] = useMailbox<T>(box)

	return value
}
