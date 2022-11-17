import { Union } from "./Union"

/**
 * Represents a type that hinges on an `error` property where `error` is a string if it is present. If and only if `error` is not defined will the values of `Type` be present.
 *
 * @template Type The type to use for this error codable type.
 */
export type ErrorCodable<Type extends object> = Union<[{ error: string }, Type]>
