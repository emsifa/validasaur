import { isArray } from "../../src/rules/is_array.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("isArray(null) should be invalid", () => {
  assertInvalid(isArray(null), invalid("isArray", { value: null }));
});

Deno.test("isArray(undefined) should be invalid", () => {
  assertInvalid(isArray(undefined), invalid("isArray", { value: undefined }));
});

Deno.test("isArray('') should be invalid", () => {
  assertInvalid(isArray(''), invalid("isArray", { value: '' }));
});

Deno.test("isArray(false) should be invalid", () => {
  assertInvalid(isArray(false), invalid("isArray", { value: false }));
});

Deno.test("isArray(0) should be invalid", () => {
  assertInvalid(isArray(0), invalid("isArray", { value: 0 }));
});

Deno.test("isArray([]) should be valid", () => {
  assertValid(isArray([]));
});
