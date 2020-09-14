import type { Validity } from "../../src/types.ts";
import { notIn } from "../../src/rules/not_in.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid, fakeUtils } from "../utils.ts";

Deno.test("rules.notIn([0, 1, 2])(0) should be invalid", () => {
  assertInvalid(
    notIn([0, 1, 2])(0, fakeUtils) as Validity,
    invalid("notIn", { value: 0, disallowedValues: [0, 1, 2] })
  );
});

Deno.test("rules.notIn([0, 1, 2])(2) should be invalid", () => {
  assertInvalid(
    notIn([0, 1, 2])(2, fakeUtils) as Validity,
    invalid("notIn", { value: 2, disallowedValues: [0, 1, 2] })
  );
});

Deno.test("rules.notIn([0, 1, 2])('0') should be valid", () => {
  assertValid(notIn([0, 1, 2])("0", fakeUtils) as Validity);
});

Deno.test("rules.notIn([0, 1, 2])(null) should be valid", () => {
  assertValid(notIn([0, 1, 2])(null, fakeUtils) as Validity);
});
