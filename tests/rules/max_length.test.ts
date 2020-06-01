import { maxLength } from "../../src/rules/max_length.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";
import { Validity } from "../../src/types.ts";

Deno.test("rules.maxLength(4)(3) should be invalid", () => {
  assertInvalid(
    maxLength(4)(3) as Validity,
    invalid("maxLength", { value: 3, maxValue: 4 }),
  );
});

Deno.test("rules.maxLength(4)('foobar') should be invalid", () => {
  assertInvalid(
    maxLength(4)("foobar") as Validity,
    invalid("maxLength", { value: "foobar", maxValue: 4 }),
  );
});

Deno.test("rules.maxLength(6)('foobar') should be valid", () => {
  assertValid(maxLength(6)("foobar") as Validity);
});

Deno.test("rules.maxLength(6)('foo') should be valid", () => {
  assertValid(maxLength(6)("foo") as Validity);
});
