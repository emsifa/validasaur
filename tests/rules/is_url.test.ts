import { isUrl } from "../../src/rules/is_url.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("rules.isUrl(null) should be invalid", () => {
  assertInvalid(isUrl(null), invalid("isUrl", { value: null }));
});

Deno.test("rules.isUrl(undefined) should be invalid", () => {
  assertInvalid(isUrl(undefined), invalid("isUrl", { value: undefined }));
});

Deno.test("rules.isUrl(0.1) should be invalid", () => {
  assertInvalid(isUrl(0.1), invalid("isUrl", { value: 0.1 }));
});

Deno.test("rules.isUrl() with invalid urls should be invalid", () => {
  const url = "test"
  assertInvalid(isUrl(url), invalid("isUrl", { value: url }));
});

Deno.test("rules.isUrl() with invalid urls should be invalid", () => {
  const url = "http:/test.com"
  assertInvalid(isUrl(url), invalid("isUrl", { value: url }));
});

Deno.test("rules.isUrl() with valid urls should be valid", () => {
  assertValid(isUrl("http://www.test.com"));
});

Deno.test("rules.isUrl() with valid urls should be valid", () => {
  assertValid(isUrl("www.test.com"));
});

Deno.test("rules.isUrl() with valid urls should be valid", () => {
  assertValid(isUrl("test.com"));
});

Deno.test("rules.isUrl() with valid urls should be valid", () => {
  assertValid(isUrl("test.com/"));
});
