/**
 * Allows you to do a type assertion without assigning to a new value. The empty function call should be stripped out by code optimizers.
 */
function as<T>(_obj: any): asserts _obj is T {}

export default as
