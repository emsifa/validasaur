import { lengthBetween } from "../../src/rules/length_between.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";
import { RuleReturn } from "../../src/types.ts";

Deno.test("rules.lengthBetween(4, 6)(3) should be invalid", () => {
  assertInvalid(
    lengthBetween(4, 6)(3) as RuleReturn,
    invalid("lengthBetween", { value: 3, minLength: 4, maxLength: 6 }),
  );
});

Deno.test("rules.lengthBetween(4, 5)('foobar') should be invalid", () => {
  assertInvalid(
    lengthBetween(4, 5)("foobar") as RuleReturn,
    invalid("lengthBetween", { value: "foobar", minLength: 4, maxLength: 5 }),
  );
});

Deno.test("rules.lengthBetween(4, 5)('foo') should be invalid", () => {
  assertInvalid(
    lengthBetween(4, 5)("foo") as RuleReturn,
    invalid("lengthBetween", { value: "foo", minLength: 4, maxLength: 5 }),
  );
});

Deno.test("rules.lengthBetween(4, 6)('foobar') should be valid", () => {
  assertValid(lengthBetween(4, 6)("foobar") as RuleReturn);
});

Deno.test("rules.lengthBetween(3, 6)('foo') should be valid", () => {
  assertValid(lengthBetween(3, 6)("foo") as RuleReturn);
});
