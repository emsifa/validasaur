import { isAlphaNumeric } from "../../src/rules/is_alpha_numeric";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("rules.isAlphaNumeric('') should be invalid", () => {
  assertInvalid(isAlphaNumeric(""), invalid("isAlphaNumeric", { value: "" }));
});

Deno.test("rules.isAlphaNumeric('123') should be invalid", () => {
  assertInvalid(isAlphaNumeric('123'), invalid("isAlphaNumeric", { value: '123' }));
});

Deno.test("rules.isInt('abc') should be invalid", () => {
  assertInvalid(isAlphaNumeric('abc'), invalid("isAlphaNumeric", { value: 'abc' }));
});

Deno.test("rules.isInt('abcDEF') should be invalid", () => {
  assertInvalid(isAlphaNumeric('abcDEF'), invalid("isAlphaNumeric", { value: 'abcDEF' }));
});


Deno.test("rules.isAlphaNumeric('abc123') should be valid", () => {
  assertValid(isAlphaNumeric('abc123'));
});


Deno.test("rules.isAlphaNumeric('123ABC') should be valid", () => {
  assertValid(isAlphaNumeric('123ABC'));
});


Deno.test("rules.isAlphaNumeric('abcDEF123') should be valid", () => {
  assertValid(isAlphaNumeric('abcDEF123'));
});


