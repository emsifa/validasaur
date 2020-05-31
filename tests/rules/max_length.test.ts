import { maxLength } from "../../src/rules/max_length.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";
import { RuleReturn } from "../../src/types.ts";

Deno.test("rules.maxLength(4)(3) should be invalid", () => {
  assertInvalid(
    maxLength(4)(3) as RuleReturn,
    invalid("maxLength", { value: 3, maxValue: 4 }),
  );
});

Deno.test("rules.maxLength(4)('foobar') should be invalid", () => {
  assertInvalid(
    maxLength(4)('foobar') as RuleReturn,
    invalid("maxLength", { value: 'foobar', maxValue: 4 }),
  );
});

Deno.test("rules.maxLength(6)('foobar') should be valid", () => {
  assertValid(maxLength(6)('foobar') as RuleReturn);
});

Deno.test("rules.maxLength(6)('foo') should be valid", () => {
  assertValid(maxLength(6)('foo') as RuleReturn);
});
