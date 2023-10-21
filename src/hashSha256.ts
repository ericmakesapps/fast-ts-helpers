import crypto from "crypto"
import stringify from "fast-json-stable-stringify"

/**
 * Calculates the SHA256 hash of the given value and returns it as a base64-encoded
 *   string. If the value is an object, it will be stringified with
 *   `fast-json-stable-stringify` before being hashed, to ensure stability
 *
 * @param val The value to hash.
 * @returns The base64-encoded SHA256 hash of the value.
 */
const hashSha256 = (val: string | Buffer | object) =>
	crypto
		.createHash("sha256")
		.update(typeof val === "string" || Buffer.isBuffer(val) ? val : stringify(val))
		.digest("base64")

export default hashSha256
