/** Make a type partial only for certain props. */
export type PartialProps<T, K extends keyof T> = Omit<T, K> &
	{
		[P in K]?: T[P]
	}
