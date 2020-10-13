import { Writable } from "./Writable"
import { FalsibleList } from "./FalsibleList"
import { flatfilter } from "./flatfilter"

/**
 * Combine a set of refs into a single ref callback.
 *
 * @template Type The commot type between the passed in refs.
 * @param refsToCombine The refs to combine into one ref callback.
 * @returns A ref callback that will set all of the passed refs.
 */
export function refs<Type>(...refsToCombine: FalsibleList<React.Ref<Type>>[]) {
	return (instance: Type | null) => {
		for (const ref of flatfilter(refsToCombine)) {
			if (typeof ref === `function`) {
				ref(instance)
			} else if (typeof ref === `object` && `current` in ref) {
				;(ref as Writable<typeof ref>).current = instance
			}
		}
	}
}
