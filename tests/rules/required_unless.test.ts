import type { Validity } from "../../src/types.ts";
import { requiredUnless } from "../../src/rules/required_unless.ts";
import { invalid, makeValidationUtils } from "../../src/utils.ts";
import { assertInvalid, assertValid, fakeUtils } from "../utils.ts";

Deno.test(
  "rules.requiredUnless('confirmed', '1')(null, { confirmed: '0' }) should be invalid",
  () => {
    const utils = makeValidationUtils({
      confirmed: "0",
    });

    assertInvalid(
      requiredUnless("confirmed", "1")(null, utils) as Validity,
      invalid("required", { value: null }, true),
    );
  },
);

Deno.test(
  "rules.requiredUnless('confirmed', '1')(null, { confirmed: '1' }) should be valid",
  () => {
    const utils = makeValidationUtils({
      confirmed: "1",
    });

    assertValid(requiredUnless("confirmed", "1")(null, utils) as Validity);
  },
);

Deno.test(
  "rules.requiredUnless('confirmed', '1')(10, { confirmed: '0' }) should be valid",
  () => {
    const utils = makeValidationUtils({
      confirmed: "0",
    });

    assertValid(requiredUnless("confirmed", "1")(10, utils) as Validity);
  },
);
