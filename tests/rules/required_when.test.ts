import type { Validity } from "../../src/types.ts";
import { requiredWhen } from "../../src/rules/required_when.ts";
import { invalid, makeValidationUtils } from "../../src/utils.ts";
import { assertInvalid, assertValid, fakeUtils } from "../utils.ts";

Deno.test(
  "rules.requiredWhen(() => true)(null) should be invalid",
  async () => {
    assertInvalid(
      (await requiredWhen(() => true)(null, fakeUtils)) as Validity,
      invalid("required", { value: null }, true)
    );
  }
);

Deno.test("rules.requiredWhen(() => false)(null) should be valid", async () => {
  assertValid((await requiredWhen(() => false)(null, fakeUtils)) as Validity);
});

Deno.test(
  "rules.requiredWhen((_, { getValue }) => getValue('x') == 1)(null, { x: '1' }) should be invalid",
  async () => {
    const utils = makeValidationUtils({
      x: "1",
    });

    assertInvalid(
      (await requiredWhen((_, { getValue }) => getValue("x") == 1)(
        null,
        utils
      )) as Validity,
      invalid("required", { value: null }, true)
    );
  }
);

Deno.test(
  "rules.requiredWhen((_, { getValue }) => getValue('x') == 1)(25, { x: '1' }) should be valid",
  async () => {
    const utils = makeValidationUtils({
      x: "1",
    });

    assertValid(
      (await requiredWhen((_, { getValue }) => getValue("x") == 1)(
        25,
        utils
      )) as Validity
    );
  }
);
