import htmlEncode from "./htmlEncode"

describe("htmlEncode helper", () => {
	test("should encode &", () => {
		expect(htmlEncode("&")).toEqual("&amp;")
	})

	test("should encode '", () => {
		expect(htmlEncode("'")).toEqual("&#39;")
	})

	test('should encode "', () => {
		expect(htmlEncode('"')).toEqual("&quot;")
	})

	test("should encode >", () => {
		expect(htmlEncode(">")).toEqual("&gt;")
	})

	test("should encode <", () => {
		expect(htmlEncode("<")).toEqual("&lt;")
	})

	test("should encode multiple instances of character", () => {
		expect(htmlEncode("&&''<<")).toEqual("&amp;&amp;&#39;&#39;&lt;&lt;")
	})
})
