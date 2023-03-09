import FalsibleList from "./FalsibleList"
import filter from "./filter"
import flat from "./flat"
import Writable from "./Writable"

/**
 * Combine a set of refs into a single ref callback.
 *
 * @template Type The commot type between the passed in refs.
 * @param refsToCombine The refs to combine into one ref callback.
 * @returns A ref callback that will set all of the passed refs.
 */
function refs<Type>(...refsToCombine: FalsibleList<React.Ref<Type>>[]) {
	return (instance: Type | null) => {
		for (const ref of filter(flat(refsToCombine))) {
			if (typeof ref === `function`) {
				ref(instance)
			} else if (typeof ref === `object` && `current` in ref) {
				;(ref as Writable<typeof ref>).current = instance
			}
		}
	}
}

export default refs
