import { isBool } from "../../src/rules/is_bool.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("isBool(null) should be invalid", () => {
  assertInvalid(isBool(null), invalid("isBool", { value: null }));
});

Deno.test("isBool(undefined) should be invalid", () => {
  assertInvalid(isBool(undefined), invalid("isBool", { value: undefined }));
});

Deno.test("isBool('') should be invalid", () => {
  assertInvalid(isBool(""), invalid("isBool", { value: "" }));
});

Deno.test("isBool(0) should be invalid", () => {
  assertInvalid(isBool(0), invalid("isBool", { value: 0 }));
});

Deno.test("isBool(true) should be valid", () => {
  assertValid(isBool(true));
});

Deno.test("isBool(false) should be valid", () => {
  assertValid(isBool(false));
});
