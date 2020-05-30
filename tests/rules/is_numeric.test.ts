import { isNumeric } from "../../src/rules/is_numeric.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("isNumeric(null) should be invalid", () => {
  assertInvalid(isNumeric(null), invalid("isNumeric", { value: null }));
});

Deno.test("isNumeric(undefined) should be invalid", () => {
  assertInvalid(
    isNumeric(undefined),
    invalid("isNumeric", { value: undefined }),
  );
});

Deno.test("isNumeric('') should be invalid", () => {
  assertInvalid(isNumeric(""), invalid("isNumeric", { value: "" }));
});

Deno.test("isNumeric(0) should be valid", () => {
  assertValid(isNumeric(0));
});

Deno.test("isNumeric(0.5) should be valid", () => {
  assertValid(isNumeric(0.5));
});

Deno.test("isNumeric('0') should be valid", () => {
  assertValid(isNumeric("0"));
});

Deno.test("isNumeric('0.5') should be valid", () => {
  assertValid(isNumeric("0.5"));
});
