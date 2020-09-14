import type { Validity } from "../../src/types.ts";
import { startsWith } from "../../src/rules/starts_with.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid, fakeUtils } from "../utils.ts";

Deno.test("rules.startsWith('foo')(null) should be invalid", () => {
  assertInvalid(
    startsWith("foo")(null, fakeUtils) as Validity,
    invalid("startsWith", { value: null, str: "foo" }),
  );
});

Deno.test("rules.startsWith('foo')('bar') should be invalid", () => {
  assertInvalid(
    startsWith("foo")("bar", fakeUtils) as Validity,
    invalid("startsWith", { value: "bar", str: "foo" }),
  );
});

Deno.test("rules.startsWith('bar')('foobar') should be invalid", () => {
  assertInvalid(
    startsWith("bar")("foobar", fakeUtils) as Validity,
    invalid("startsWith", { value: "foobar", str: "bar" }),
  );
});

Deno.test("rules.startsWith('foo')('foobar') should be valid", () => {
  assertValid(startsWith("foo")("foobar", fakeUtils) as Validity);
});

Deno.test("rules.startsWith('foobarbaz')('foobarbaz') should be valid", () => {
  assertValid(startsWith("foobarbaz")("foobarbaz", fakeUtils) as Validity);
});
