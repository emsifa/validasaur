import { maxLength } from "../../src/rules/max_length.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid, fakeUtils } from "../utils.ts";
import { Validity } from "../../src/types.ts";

Deno.test("rules.maxLength(4)(3) should be invalid", () => {
  assertInvalid(
    maxLength(4)(3, fakeUtils) as Validity,
    invalid("maxLength", { value: 3, maxValue: 4 }),
  );
});

Deno.test("rules.maxLength(4)('foobar') should be invalid", () => {
  assertInvalid(
    maxLength(4)("foobar", fakeUtils) as Validity,
    invalid("maxLength", { value: "foobar", maxValue: 4 }),
  );
});

Deno.test("rules.maxLength(6)('foobar') should be valid", () => {
  assertValid(maxLength(6)("foobar", fakeUtils) as Validity);
});

Deno.test("rules.maxLength(6)('foo') should be valid", () => {
  assertValid(maxLength(6)("foo", fakeUtils) as Validity);
});
