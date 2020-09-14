import type { Validity, Rule } from "../../src/types.ts";
import { validateArray } from "../../src/rules/validate_array.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid, fakeUtils } from "../utils.ts";
import { isNumber } from "../../src/rules/is_number.ts";
import { assertEquals, assertNotEquals } from "../deps.ts";
import { required } from "../../src/rules/required.ts";

Deno.test(
  "rules.validateArray(true, [isNumber]) should return required rule first",
  () => {
    const rules = validateArray(true, [isNumber]);
    assertEquals(rules[0], required);
  },
);

Deno.test(
  "rules.validateArray(false, [isNumber]) shouldn't return required rule first",
  () => {
    const rules = validateArray(false, [isNumber]);
    assertNotEquals(rules[0], required);
  },
);

Deno.test(
  "rules.validateArray(false, [isNumber])[0](null) should be valid",
  async () => {
    const rule = validateArray(false, [isNumber])[0] as Rule;
    assertNotEquals(rule, required);
    assertEquals(typeof rule, "function");
    const result = (await rule(null, fakeUtils)) as Validity;
    assertValid(result);
  },
);

Deno.test(
  "rules.validateArray(true, [isNumber])[1]([]) should be valid",
  async () => {
    const rule = validateArray(true, [isNumber])[1] as Rule;
    assertNotEquals(rule, required);
    assertEquals(typeof rule, "function");
    const result = (await rule([], fakeUtils)) as Validity;
    assertValid(result);
  },
);

Deno.test(
  "rules.validateArray(true, [isNumber], { minLength: 1 })[1]([]) should be invalid",
  async () => {
    const rule = validateArray(true, [isNumber], { minLength: 1 })[1] as Rule;
    assertNotEquals(rule, required);
    assertEquals(typeof rule, "function");
    const result = (await rule([], fakeUtils)) as Validity;
    assertInvalid(
      result,
      invalid("validateArray:minLengthCheck", { value: [], minLength: 1 }),
    );
  },
);

Deno.test(
  "rules.validateArray(true, [isNumber], { minLength: 1 })[1]([100]) should be valid",
  async () => {
    const rule = validateArray(true, [isNumber], { minLength: 1 })[1] as Rule;
    assertNotEquals(rule, required);
    assertEquals(typeof rule, "function");
    const result = (await rule([100], fakeUtils)) as Validity;
    assertValid(result);
  },
);

Deno.test(
  "rules.validateArray(true, [isNumber], { maxLength: 3 })[1]([1, 2, 3]) should be valid",
  async () => {
    const rule = validateArray(true, [isNumber], { maxLength: 3 })[1] as Rule;
    assertNotEquals(rule, required);
    assertEquals(typeof rule, "function");
    const result = (await rule([1, 2, 3], fakeUtils)) as Validity;
    assertValid(result);
  },
);

Deno.test(
  "rules.validateArray(true, [isNumber], { maxLength: 3 })[1]([1, 2, 3, 4]) should be invalid",
  async () => {
    const rule = validateArray(true, [isNumber], { maxLength: 3 })[1] as Rule;
    assertNotEquals(rule, required);
    assertEquals(typeof rule, "function");
    const result = (await rule([1, 2, 3, 4], fakeUtils)) as Validity;
    assertInvalid(
      result,
      invalid("validateArray:maxLengthCheck", {
        value: [1, 2, 3, 4],
        maxLength: 3,
      }),
    );
  },
);
