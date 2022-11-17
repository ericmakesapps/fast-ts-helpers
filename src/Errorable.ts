import { Union } from "./Union"

/**
 * Represents a type that hinges on a `error` property. If and only if `error` is not defined will the values of `Type` will be present.
 *
 * @template Type The type to use for this errorable type.
 */
export type Errorable<Type extends object> = Union<{ error: true } | Type>
