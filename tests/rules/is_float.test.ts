import { isFloat } from "../../src/rules/is_float.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("isFloat(null) should be invalid", () => {
  assertInvalid(isFloat(null), invalid("isFloat", { value: null }));
});

Deno.test("isFloat(undefined) should be invalid", () => {
  assertInvalid(isFloat(undefined), invalid("isFloat", { value: undefined }));
});

Deno.test("isFloat('') should be invalid", () => {
  assertInvalid(isFloat(''), invalid("isFloat", { value: '' }));
});

Deno.test("isFloat(0) should be invalid", () => {
  assertInvalid(isFloat(0), invalid("isFloat", { value: 0 }));
});

Deno.test("isFloat(123) should be invalid", () => {
  assertInvalid(isFloat(123), invalid("isFloat", { value: 123 }));
});

Deno.test("isFloat(0.1) should be valid", () => {
  assertValid(isFloat(0.1));
});

Deno.test("isFloat(1.23) should be valid", () => {
  assertValid(isFloat(1.23));
});
