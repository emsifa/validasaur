import type { Validity } from "../../src/types.ts";
import { maxNumber } from "../../src/rules/max_number.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid, fakeUtils } from "../utils.ts";

Deno.test("rules.maxNumber(5)(10) should be invalid", () => {
  assertInvalid(
    maxNumber(5)(10, fakeUtils) as Validity,
    invalid("maxNumber", { value: 10, maxValue: 5 })
  );
});

Deno.test("rules.maxNumber(5)(5) should be valid", () => {
  assertValid(maxNumber(5)(5, fakeUtils) as Validity);
});

Deno.test("rules.maxNumber(5)(4.999) should be valid", () => {
  assertValid(maxNumber(5)(4.999, fakeUtils) as Validity);
});
