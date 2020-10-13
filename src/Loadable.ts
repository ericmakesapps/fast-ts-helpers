import { IfPropIsTrue } from "./IfPropIsTrue"

export type Loadable<T extends object> = IfPropIsTrue<"loaded", T>
