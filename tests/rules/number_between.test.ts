import { numberBetween } from "../../src/rules/number_between.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";
import { Validity } from "../../src/types.ts";

Deno.test("rules.numberBetween(1, 5)(5.1) should be invalid", () => {
  assertInvalid(
    numberBetween(1, 5)(5.1) as Validity,
    invalid("numberBetween", { value: 5.1, maxValue: 5, minValue: 1 }),
  );
});

Deno.test("rules.numberBetween(1, 5)(0.9) should be invalid", () => {
  assertInvalid(
    numberBetween(1, 5)(0.9) as Validity,
    invalid("numberBetween", { value: 0.9, maxValue: 5, minValue: 1 }),
  );
});

Deno.test("rules.numberBetween(1, 5)(1) should be valid", () => {
  assertValid(numberBetween(1, 5)(1) as Validity);
});

Deno.test("rules.numberBetween(1, 5)(5) should be valid", () => {
  assertValid(numberBetween(1, 5)(5) as Validity);
});
