import { required } from "../../src/rules/required.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("required(null) should be invalid", () => {
  assertInvalid(required(null), invalid("required", { value: null }, true));
});

Deno.test("required(undefined) should be invalid", () => {
  assertInvalid(
    required(undefined),
    invalid("required", { value: undefined }, true),
  );
});

Deno.test("required('') should be invalid", () => {
  assertInvalid(required(""), invalid("required", { value: "" }, true));
});

Deno.test("required(0) should be valid", () => {
  assertValid(required(0));
});

Deno.test("required([]) should be valid", () => {
  assertValid(required([]));
});

Deno.test("required({}) should be valid", () => {
  assertValid(required({}));
});

Deno.test("required('0') should be valid", () => {
  assertValid(required("0"));
});
