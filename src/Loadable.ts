import IfPropIsTrue from "./IfPropIsTrue"

type Loadable<T extends object> = IfPropIsTrue<"loaded", T>

export default Loadable
