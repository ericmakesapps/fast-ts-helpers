/** Make a type partial only for certain props. */
type PartialProps<T, K extends keyof T> = Omit<T, K> & {
	[P in K]?: T[P]
}

export default PartialProps
