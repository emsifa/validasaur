import { isArray } from "../../src/rules/is_array.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("rules.isArray(null) should be invalid", () => {
  assertInvalid(isArray(null), invalid("isArray", { value: null }));
});

Deno.test("rules.isArray(undefined) should be invalid", () => {
  assertInvalid(isArray(undefined), invalid("isArray", { value: undefined }));
});

Deno.test("rules.isArray('') should be invalid", () => {
  assertInvalid(isArray(""), invalid("isArray", { value: "" }));
});

Deno.test("rules.isArray(false) should be invalid", () => {
  assertInvalid(isArray(false), invalid("isArray", { value: false }));
});

Deno.test("rules.isArray(0) should be invalid", () => {
  assertInvalid(isArray(0), invalid("isArray", { value: 0 }));
});

Deno.test("rules.isArray([]) should be valid", () => {
  assertValid(isArray([]));
});
