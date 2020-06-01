import { nullable } from "../../src/rules/nullable.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("rules.nullable(undefined) should be invalid", () => {
  assertInvalid(
    nullable(undefined),
    invalid("nullable", { value: undefined }, true),
  );
});

Deno.test("rules.nullable(null) should be valid", () => {
  assertValid(nullable(null));
});
