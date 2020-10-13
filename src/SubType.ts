/**
 * Extract the types from `Base` that extend the `Condition`.
 *
 * @template Base The base type to extract from.
 * @template Condition The type to use as the condition for the extraction.
 */
export type SubType<Base extends object, Condition> = Pick<
	Base,
	{
		[Key in keyof Base]: Base[Key] extends Condition ? Key : never
	}[keyof Base]
>
