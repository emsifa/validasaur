import type { Validity } from "../../src/types.ts";
import { lengthBetween } from "../../src/rules/length_between.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid, fakeUtils } from "../utils.ts";

Deno.test("rules.lengthBetween(4, 6)(3) should be invalid", () => {
  assertInvalid(
    lengthBetween(4, 6)(3, fakeUtils) as Validity,
    invalid("lengthBetween", { value: 3, minLength: 4, maxLength: 6 })
  );
});

Deno.test("rules.lengthBetween(4, 5)('foobar') should be invalid", () => {
  assertInvalid(
    lengthBetween(4, 5)("foobar", fakeUtils) as Validity,
    invalid("lengthBetween", { value: "foobar", minLength: 4, maxLength: 5 })
  );
});

Deno.test("rules.lengthBetween(4, 5)('foo') should be invalid", () => {
  assertInvalid(
    lengthBetween(4, 5)("foo", fakeUtils) as Validity,
    invalid("lengthBetween", { value: "foo", minLength: 4, maxLength: 5 })
  );
});

Deno.test("rules.lengthBetween(4, 6)('foobar') should be valid", () => {
  assertValid(lengthBetween(4, 6)("foobar", fakeUtils) as Validity);
});

Deno.test("rules.lengthBetween(3, 6)('foo') should be valid", () => {
  assertValid(lengthBetween(3, 6)("foo", fakeUtils) as Validity);
});
