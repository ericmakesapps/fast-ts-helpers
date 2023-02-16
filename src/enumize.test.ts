import assertType from "./assertType"
import ValueOf from "./ValueOf"
import enumize from "./enumize"

describe("enumize helper", () => {
	test("should create an enum from the passed strings", () => {
		const enumeration = enumize("hello", "world")
		// eslint-disable-next-line @typescript-eslint/no-redeclare
		type enumeration = ValueOf<typeof enumeration>

		// The enumeration value has the literal object type mapping the names to the string values
		assertType<{ hello: "hello"; world: "world" }>(enumeration)

		// Each enumeration prop matches the right value
		assertType<"hello">(enumeration.hello)
		assertType<"world">(enumeration.world)

		// The enumeration type is a string union
		assertType<enumeration>("hello")
		assertType<enumeration>("world")

		// The enumeration value is an actual object mapping the names to the string values
		expect(enumeration).toEqual({ hello: "hello", world: "world" })
	})
})
