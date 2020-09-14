import type { Validity } from "../../src/types.ts";
import { minNumber } from "../../src/rules/min_number.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid, fakeUtils } from "../utils.ts";

Deno.test("rules.minNumber(5)(4) should be invalid", () => {
  assertInvalid(
    minNumber(5)(4, fakeUtils) as Validity,
    invalid("minNumber", { value: 4, minValue: 5 }),
  );
});

Deno.test("rules.minNumber(5)(6) should be valid", () => {
  assertValid(minNumber(5)(6, fakeUtils) as Validity);
});

Deno.test("rules.minNumber(5)(5) should be valid", () => {
  assertValid(minNumber(5)(5, fakeUtils) as Validity);
});
