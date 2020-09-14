import type { Validity } from "../../src/types.ts";
import { requiredIf } from "../../src/rules/required_if.ts";
import { invalid, makeValidationUtils } from "../../src/utils.ts";
import { assertInvalid, assertValid, fakeUtils } from "../utils.ts";

Deno.test(
  "rules.requiredIf('confirmed', '1')(null, { confirmed: '1' }) should be invalid",
  () => {
    const utils = makeValidationUtils({
      confirmed: "1",
    });

    assertInvalid(
      requiredIf("confirmed", "1")(null, utils) as Validity,
      invalid("required", { value: null }, true),
    );
  },
);

Deno.test(
  "rules.requiredIf('confirmed', '1')(null, { confirmed: '0' }) should be valid",
  () => {
    const utils = makeValidationUtils({
      confirmed: "0",
    });

    assertValid(requiredIf("confirmed", "1")(null, utils) as Validity);
  },
);

Deno.test(
  "rules.requiredIf('confirmed', '1')(10, { confirmed: '1' }) should be valid",
  () => {
    const utils = makeValidationUtils({
      confirmed: "1",
    });

    assertValid(requiredIf("confirmed", "1")(10, utils) as Validity);
  },
);
