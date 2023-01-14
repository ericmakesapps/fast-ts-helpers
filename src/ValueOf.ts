type ValueOf<T extends {}> = T[keyof T]

export default ValueOf
