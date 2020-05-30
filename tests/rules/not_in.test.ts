import { notIn } from "../../src/rules/not_in.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";
import { RuleReturn } from "../../src/types.ts";

Deno.test("notIn([0, 1, 2])(0) should be invalid", () => {
  assertInvalid(
    notIn([0, 1, 2])(0) as RuleReturn,
    invalid("notIn", { value: 0, disallowedValues: [0, 1, 2] }),
  );
});

Deno.test("notIn([0, 1, 2])(2) should be invalid", () => {
  assertInvalid(
    notIn([0, 1, 2])(2) as RuleReturn,
    invalid("notIn", { value: 2, disallowedValues: [0, 1, 2] }),
  );
});

Deno.test("notIn([0, 1, 2])('0') should be valid", () => {
  assertValid(notIn([0, 1, 2])("0") as RuleReturn);
});

Deno.test("notIn([0, 1, 2])(null) should be valid", () => {
  assertValid(notIn([0, 1, 2])(null) as RuleReturn);
});
