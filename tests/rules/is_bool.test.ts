import { isBool } from "../../src/rules/is_bool.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("rules.isBool(null) should be invalid", () => {
  assertInvalid(isBool(null), invalid("isBool", { value: null }));
});

Deno.test("rules.isBool(undefined) should be invalid", () => {
  assertInvalid(isBool(undefined), invalid("isBool", { value: undefined }));
});

Deno.test("rules.isBool('') should be invalid", () => {
  assertInvalid(isBool(""), invalid("isBool", { value: "" }));
});

Deno.test("rules.isBool(0) should be invalid", () => {
  assertInvalid(isBool(0), invalid("isBool", { value: 0 }));
});

Deno.test("rules.isBool(true) should be valid", () => {
  assertValid(isBool(true));
});

Deno.test("rules.isBool(false) should be valid", () => {
  assertValid(isBool(false));
});
