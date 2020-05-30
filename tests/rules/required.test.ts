import { required } from "../../src/rules/required.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("rules.required(null) should be invalid", () => {
  assertInvalid(required(null), invalid("required", { value: null }, true));
});

Deno.test("rules.required(undefined) should be invalid", () => {
  assertInvalid(
    required(undefined),
    invalid("required", { value: undefined }, true),
  );
});

Deno.test("rules.required('') should be invalid", () => {
  assertInvalid(required(""), invalid("required", { value: "" }, true));
});

Deno.test("rules.required(0) should be valid", () => {
  assertValid(required(0));
});

Deno.test("rules.required([]) should be valid", () => {
  assertValid(required([]));
});

Deno.test("rules.required({}) should be valid", () => {
  assertValid(required({}));
});

Deno.test("rules.required('0') should be valid", () => {
  assertValid(required("0"));
});
