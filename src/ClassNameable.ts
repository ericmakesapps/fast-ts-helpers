import { FalsibleList } from "./FalsibleList"

/** A helper type for a props that can have a `className`. */
export type ClassNameable = {
	className?: FalsibleList<string>
}
