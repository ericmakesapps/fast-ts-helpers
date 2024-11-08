/** Extract from a string union type those strings containing a substring. */
type ExtractContains<
	From extends string,
	Type extends string
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
> = From extends `${infer _}${Type}${infer __}` ? From : never

export default ExtractContains
