import { endsWith } from "../../src/rules/ends_with.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid, fakeUtils } from "../utils.ts";
import { Validity } from "../../src/types.ts";

Deno.test("rules.endsWith('foo')(null) should be invalid", () => {
  assertInvalid(
    endsWith("foo")(null, fakeUtils) as Validity,
    invalid("endsWith", { value: null, str: "foo" }),
  );
});

Deno.test("rules.endsWith('foo')('bar') should be invalid", () => {
  assertInvalid(
    endsWith("foo")("bar", fakeUtils) as Validity,
    invalid("endsWith", { value: "bar", str: "foo" }),
  );
});

Deno.test("rules.endsWith('foo')('foobar') should be invalid", () => {
  assertInvalid(
    endsWith("foo")("foobar", fakeUtils) as Validity,
    invalid("endsWith", { value: "foobar", str: "foo" }),
  );
});

Deno.test("rules.endsWith('bar')('foobar') should be valid", () => {
  assertValid(endsWith("bar")("foobar", fakeUtils) as Validity);
});

Deno.test("rules.endsWith('foobarbaz')('foobarbaz') should be valid", () => {
  assertValid(endsWith("foobarbaz")("foobarbaz", fakeUtils) as Validity);
});
