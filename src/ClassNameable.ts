import FalsibleList from "./FalsibleList"

/** A helper type for a props that can have a `className`. */
type ClassNameable = {
	className?: FalsibleList<string>
}

export default ClassNameable
