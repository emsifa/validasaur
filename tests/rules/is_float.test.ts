import { isFloat } from "../../src/rules/is_float.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("rules.isFloat(null) should be invalid", () => {
  assertInvalid(isFloat(null), invalid("isFloat", { value: null }));
});

Deno.test("rules.isFloat(undefined) should be invalid", () => {
  assertInvalid(isFloat(undefined), invalid("isFloat", { value: undefined }));
});

Deno.test("rules.isFloat('') should be invalid", () => {
  assertInvalid(isFloat(""), invalid("isFloat", { value: "" }));
});

Deno.test("rules.isFloat(0) should be invalid", () => {
  assertInvalid(isFloat(0), invalid("isFloat", { value: 0 }));
});

Deno.test("rules.isFloat(123) should be invalid", () => {
  assertInvalid(isFloat(123), invalid("isFloat", { value: 123 }));
});

Deno.test("rules.isFloat(0.1) should be valid", () => {
  assertValid(isFloat(0.1));
});

Deno.test("rules.isFloat(1.23) should be valid", () => {
  assertValid(isFloat(1.23));
});
