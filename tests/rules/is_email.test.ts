import { isEmail } from "../../src/rules/is_email.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("rules.isEmail(null) should be invalid", () => {
  assertInvalid(isEmail(null), invalid("isEmail", { value: null }));
});

Deno.test("rules.isEmail(undefined) should be invalid", () => {
  assertInvalid(isEmail(undefined), invalid("isEmail", { value: undefined }));
});

Deno.test("rules.isEmail('') should be invalid", () => {
  assertInvalid(isEmail(""), invalid("isEmail", { value: "" }));
});

Deno.test("rules.isEmail('foo.mail.com') should be invalid", () => {
  assertInvalid(
    isEmail("foo.mail.com"),
    invalid("isEmail", { value: "foo.mail.com" }),
  );
});

Deno.test("rules.isEmail('foo@mail.com') should be valid", () => {
  assertValid(isEmail("foo@mail.com"));
});

Deno.test("rules.isEmail('foo.bar@mail.com') should be valid", () => {
  assertValid(isEmail("foo.bar@mail.com"));
});

Deno.test("rules.isEmail('foo_bar@mail.com') should be valid", () => {
  assertValid(isEmail("foo_bar@mail.com"));
});

Deno.test("rules.isEmail('foobar@[1.2.3.4]') should be valid", () => {
  assertValid(isEmail("foobar@[1.2.3.4]"));
});
