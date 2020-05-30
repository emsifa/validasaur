import { isNumber } from "../../src/rules/is_number.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("isNumber(null) should be invalid", () => {
  assertInvalid(isNumber(null), invalid("isNumber", { value: null }));
});

Deno.test("isNumber(undefined) should be invalid", () => {
  assertInvalid(isNumber(undefined), invalid("isNumber", { value: undefined }));
});

Deno.test("isNumber([]) should be invalid", () => {
  assertInvalid(isNumber([]), invalid("isNumber", { value: [] }));
});

Deno.test("isNumber([0]) should be invalid", () => {
  assertInvalid(isNumber([0]), invalid("isNumber", { value: [0] }));
});

Deno.test("isNumber('0') should be invalid", () => {
  assertInvalid(isNumber("0"), invalid("isNumber", { value: "0" }));
});

Deno.test("isNumber({}) should be invalid", () => {
  assertInvalid(isNumber({}), invalid("isNumber", { value: {} }));
});

Deno.test("isNumber(1.23) should be valid", () => {
  assertValid(isNumber(1.23));
});

Deno.test("isNumber(123) should be valid", () => {
  assertValid(isNumber(123));
});
