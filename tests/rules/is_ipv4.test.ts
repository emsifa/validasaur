import { isIPv4 } from "../../src/rules/is_ipv4.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("rules.isIPv4(null) should be invalid", () => {
  assertInvalid(isIPv4(null), invalid("isIPv4", { value: null }));
});

Deno.test("rules.isIPv4(undefined) should be invalid", () => {
  assertInvalid(isIPv4(undefined), invalid("isIPv4", { value: undefined }));
});

Deno.test("rules.isIPv4('1.2.3.b') should be invalid", () => {
  assertInvalid(isIPv4("1.2.3.b"), invalid("isIPv4", { value: "1.2.3.b" }));
});

Deno.test("rules.isIPv4('0.1.2.3') should be valid", () => {
  assertValid(isIPv4("0.1.2.3"));
});

Deno.test("rules.isIPv4('255.255.255.255') should be valid", () => {
  assertValid(isIPv4("255.255.255.255"));
});

Deno.test("rules.isIPv4('1.2.3.256') should be invalid", () => {
  assertInvalid(isIPv4("1.2.3.256"), invalid("isIPv4", { value: "1.2.3.256" }));
});
