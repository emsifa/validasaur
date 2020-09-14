import type { Validity } from "../../src/types.ts";
import { numberBetween } from "../../src/rules/number_between.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid, fakeUtils } from "../utils.ts";

Deno.test("rules.numberBetween(1, 5)(5.1) should be invalid", () => {
  assertInvalid(
    numberBetween(1, 5)(5.1, fakeUtils) as Validity,
    invalid("numberBetween", { value: 5.1, maxValue: 5, minValue: 1 }),
  );
});

Deno.test("rules.numberBetween(1, 5)(0.9) should be invalid", () => {
  assertInvalid(
    numberBetween(1, 5)(0.9, fakeUtils) as Validity,
    invalid("numberBetween", { value: 0.9, maxValue: 5, minValue: 1 }),
  );
});

Deno.test("rules.numberBetween(1, 5)(1) should be valid", () => {
  assertValid(numberBetween(1, 5)(1, fakeUtils) as Validity);
});

Deno.test("rules.numberBetween(1, 5)(5) should be valid", () => {
  assertValid(numberBetween(1, 5)(5, fakeUtils) as Validity);
});
