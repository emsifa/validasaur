import { minNumber } from "../../src/rules/min_number.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";
import { Validity } from "../../src/types.ts";

Deno.test("rules.minNumber(5)(4) should be invalid", () => {
  assertInvalid(
    minNumber(5)(4) as Validity,
    invalid("minNumber", { value: 4, minValue: 5 }),
  );
});

Deno.test("rules.minNumber(5)(6) should be valid", () => {
  assertValid(minNumber(5)(6) as Validity);
});

Deno.test("rules.minNumber(5)(5) should be valid", () => {
  assertValid(minNumber(5)(5) as Validity);
});
