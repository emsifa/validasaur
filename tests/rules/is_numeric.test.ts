import { isNumeric } from "../../src/rules/is_numeric.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("rules.isNumeric(null) should be invalid", () => {
  assertInvalid(isNumeric(null), invalid("isNumeric", { value: null }));
});

Deno.test("rules.isNumeric(undefined) should be invalid", () => {
  assertInvalid(
    isNumeric(undefined),
    invalid("isNumeric", { value: undefined }),
  );
});

Deno.test("rules.isNumeric('') should be invalid", () => {
  assertInvalid(isNumeric(""), invalid("isNumeric", { value: "" }));
});

Deno.test("rules.isNumeric(0) should be valid", () => {
  assertValid(isNumeric(0));
});

Deno.test("rules.isNumeric(0.5) should be valid", () => {
  assertValid(isNumeric(0.5));
});

Deno.test("rules.isNumeric('0') should be valid", () => {
  assertValid(isNumeric("0"));
});

Deno.test("rules.isNumeric('0.5') should be valid", () => {
  assertValid(isNumeric("0.5"));
});
