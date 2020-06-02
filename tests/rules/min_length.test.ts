import { minLength } from "../../src/rules/min_length.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid, fakeUtils } from "../utils.ts";
import { Validity } from "../../src/types.ts";

Deno.test("rules.minLength(4)(5) should be invalid", () => {
  assertInvalid(
    minLength(4)(5, fakeUtils) as Validity,
    invalid("minLength", { value: 5, minValue: 4 }),
  );
});

Deno.test("rules.minLength(4)('foo') should be invalid", () => {
  assertInvalid(
    minLength(4)("foo", fakeUtils) as Validity,
    invalid("minLength", { value: "foo", minValue: 4 }),
  );
});

Deno.test("rules.minLength(6)('foobar') should be valid", () => {
  assertValid(minLength(6)("foobar", fakeUtils) as Validity);
});

Deno.test("rules.minLength(6)('foobarbaz') should be valid", () => {
  assertValid(minLength(6)("foobarbaz", fakeUtils) as Validity);
});
