import { pattern } from "../../src/rules/pattern.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";
import { RuleReturn } from "../../src/types.ts";

Deno.test("rules.pattern(/^[a-z0-9]{3}$/)(3) should be invalid", () => {
  assertInvalid(
    pattern(/^[a-z0-9]{3}$/)(3) as RuleReturn,
    invalid("pattern", { value: 3, regex: /^[a-z0-9]{3}$/ }),
  );
});

Deno.test("rules.pattern(/^[a-z0-9]{3}$/)('fo$') should be invalid", () => {
  assertInvalid(
    pattern(/^[a-z0-9]{3}$/)("fo$") as RuleReturn,
    invalid("pattern", { value: "fo$", regex: /^[a-z0-9]{3}$/ }),
  );
});

Deno.test("rules.pattern(/^[a-z0-9]{3}$/)('fo1') should be valid", () => {
  assertValid(pattern(/^[a-z0-9]{3}$/)("fo1") as RuleReturn);
});

Deno.test("rules.pattern(/^[a-z0-9]{3}$/)(' fo1') should be invalid", () => {
  assertInvalid(
    pattern(/^[a-z0-9]{3}$/)(" fo1") as RuleReturn,
    invalid("pattern", { value: " fo1", regex: /^[a-z0-9]{3}$/ }),
  );
});

Deno.test("rules.pattern(/^[a-z0-9]{3}$/)(' fo1') should be valid", () => {
  assertValid(pattern(/^[a-z0-9]{3}$/, true)("fo1") as RuleReturn);
});
