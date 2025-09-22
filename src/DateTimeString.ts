import DateString from "./DateString"
import TimeString from "./TimeString"

type DateTimeString = DateString | `${DateString}T${TimeString}` | TimeString

export default DateTimeString
