import { match } from "../../src/rules/match.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";
import { RuleReturn } from "../../src/types.ts";

Deno.test("rules.match(/^[a-z0-9]{3}$/)(3) should be invalid", () => {
  assertInvalid(
    match(/^[a-z0-9]{3}$/)(3) as RuleReturn,
    invalid("match", { value: 3, regex: /^[a-z0-9]{3}$/ }),
  );
});

Deno.test("rules.match(/^[a-z0-9]{3}$/)('fo$') should be invalid", () => {
  assertInvalid(
    match(/^[a-z0-9]{3}$/)("fo$") as RuleReturn,
    invalid("match", { value: "fo$", regex: /^[a-z0-9]{3}$/ }),
  );
});

Deno.test("rules.match(/^[a-z0-9]{3}$/)('fo1') should be valid", () => {
  assertValid(match(/^[a-z0-9]{3}$/)("fo1") as RuleReturn);
});

Deno.test("rules.match(/^[a-z0-9]{3}$/)(' fo1') should be invalid", () => {
  assertInvalid(
    match(/^[a-z0-9]{3}$/)(" fo1") as RuleReturn,
    invalid("match", { value: " fo1", regex: /^[a-z0-9]{3}$/ }),
  );
});

Deno.test("rules.match(/^[a-z0-9]{3}$/)(' fo1') should be valid", () => {
  assertValid(match(/^[a-z0-9]{3}$/, true)("fo1") as RuleReturn);
});
