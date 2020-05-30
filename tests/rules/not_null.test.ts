import { notNull } from "../../src/rules/not_null.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";
import { RuleReturn } from "../../src/types.ts";

Deno.test("rules.notNull(null) should be invalid", () => {
  assertInvalid(notNull(null), invalid("notNull", { value: null }, true));
});

Deno.test("rules.notNull(0) should be valid", () => {
  assertValid(notNull(0));
});
