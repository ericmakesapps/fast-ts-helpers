import mapflat from "./mapflat"

describe("mapflat helper", () => {
	test("should flatten an array then map it without flattening the result", () => {
		expect(mapflat([[["hello"]], [[[[[[[["world"]]]]]]]]], (s) => [s.length])).toEqual([
			[5],
			[5]
		])
	})
})
