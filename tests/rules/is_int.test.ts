import { isInt } from "../../src/rules/is_int.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("rules.isInt(null) should be invalid", () => {
  assertInvalid(isInt(null), invalid("isInt", { value: null }));
});

Deno.test("rules.isInt(undefined) should be invalid", () => {
  assertInvalid(isInt(undefined), invalid("isInt", { value: undefined }));
});

Deno.test("rules.isInt('') should be invalid", () => {
  assertInvalid(isInt(""), invalid("isInt", { value: "" }));
});

Deno.test("rules.isInt(0.1) should be invalid", () => {
  assertInvalid(isInt(0.1), invalid("isInt", { value: 0.1 }));
});

Deno.test("rules.isInt(123.1) should be invalid", () => {
  assertInvalid(isInt(123.1), invalid("isInt", { value: 123.1 }));
});

Deno.test("rules.isInt(0) should be valid", () => {
  assertValid(isInt(0));
});

Deno.test("rules.isInt(123) should be valid", () => {
  assertValid(isInt(123));
});
