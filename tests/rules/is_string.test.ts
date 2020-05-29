import { isString } from "../../src/rules/is_string.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("isString(null) should be invalid", () => {
  assertInvalid(isString(null), invalid("isString", { value: null }));
});

Deno.test("isString(undefined) should be invalid", () => {
  assertInvalid(isString(undefined), invalid("isString", { value: undefined }));
});

Deno.test("isString(0.1) should be invalid", () => {
  assertInvalid(isString(0.1), invalid("isString", { value: 0.1 }));
});

Deno.test("isString('') should be valid", () => {
  assertValid(isString(''));
});
