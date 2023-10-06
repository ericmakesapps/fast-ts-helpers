import emailRegex from "./emailRegex"

describe("emailRegex helper", () => {
	test("should match valid emails", () => {
		expect("email@example.com").toMatch(emailRegex)
		expect("firstname.lastname@example.com").toMatch(emailRegex)
		expect("email@subdomain.example.com").toMatch(emailRegex)
		expect("firstname+lastname@example.com").toMatch(emailRegex)
		expect("email@123.123.123.123").toMatch(emailRegex)
		expect("email@[123.123.123.123]").toMatch(emailRegex)
		expect('"email"@example.com').toMatch(emailRegex)
		expect("1234567890@example.com").toMatch(emailRegex)
		expect("email@example-one.com").toMatch(emailRegex)
		expect("_______@example.com").toMatch(emailRegex)
		expect("email@example.name").toMatch(emailRegex)
		expect("email@example.museum").toMatch(emailRegex)
		expect("email@example.co.jp").toMatch(emailRegex)
		expect("firstname-lastname@example.co").toMatch(emailRegex)
	})

	test("should not match invalid “emails”", () => {
		expect("plainaddress").not.toMatch(emailRegex)
		expect("#@%^%#$@#$@#.com").not.toMatch(emailRegex)
		expect("@example.com").not.toMatch(emailRegex)
		expect("Joe Smith <email@example.com>").not.toMatch(emailRegex)
		expect("email.example.com").not.toMatch(emailRegex)
		expect("email@example@example.com").not.toMatch(emailRegex)
		expect(".email@example.com").not.toMatch(emailRegex)
		expect("email.@example.com").not.toMatch(emailRegex)
		expect("email..email@example.com").not.toMatch(emailRegex)
		expect("あいうえお@example.com").not.toMatch(emailRegex)
		expect("email@example.com (Joe Smith)").not.toMatch(emailRegex)
		expect("email@example").not.toMatch(emailRegex)
		expect("email@-example.com").not.toMatch(emailRegex)
		expect(
			"12345678901234567890123456789012345678901234567890123456789012345@example.com"
		).not.toMatch(emailRegex)
		expect("email@example..com").not.toMatch(emailRegex)
		expect("Abc..123@example.com").not.toMatch(emailRegex)
		expect("“(),:;<>[]@example.com").not.toMatch(emailRegex)
		expect('just"not"right@example.com').not.toMatch(emailRegex)
		expect('this\\ is"really"not\\allowed@example.com').not.toMatch(emailRegex)
		expect("i.like.underscores@but_they_are_not_allowed_in_this_part").not.toMatch(
			emailRegex
		)
	})
})
