import { notNaN } from "../../src/rules/not_nan.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("rules.notNaN(NaN) should be invalid", () => {
  assertInvalid(notNaN(NaN), invalid("notNaN", { value: NaN }, true));
});

Deno.test("rules.notNaN(0) should be valid", () => {
  assertValid(notNaN(0));
});
