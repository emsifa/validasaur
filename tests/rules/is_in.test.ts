import { isIn } from "../../src/rules/is_in.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";
import { Validity } from "../../src/types.ts";

Deno.test("rules.isIn([0, 1, 2])(null) should be invalid", () => {
  assertInvalid(
    isIn([0, 1, 2])(null) as Validity,
    invalid("isIn", { value: null, allowedValues: [0, 1, 2] }),
  );
});

Deno.test("rules.isIn([0, 1, 2])('0') should be invalid", () => {
  assertInvalid(
    isIn([0, 1, 2])("0") as Validity,
    invalid("isIn", { value: "0", allowedValues: [0, 1, 2] }),
  );
});

Deno.test("rules.isIn([0, 1, 2])(1) should be valid", () => {
  assertValid(isIn([0, 1, 2])(1) as Validity);
});

Deno.test("rules.isIn([0, 1, 2])(0) should be valid", () => {
  assertValid(isIn([0, 1, 2])(0) as Validity);
});

Deno.test("rules.isIn([0, 1, 2])(2) should be valid", () => {
  assertValid(isIn([0, 1, 2])(2) as Validity);
});
