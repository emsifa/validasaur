import { RuleReturn } from "../src/types.ts";
import { InvalidPayload } from "../src/interfaces.ts";
import { assertEquals, assertNotEquals } from "./deps.ts";

export const assertInvalid = (
  result: RuleReturn,
  payload: InvalidPayload,
  message?: string,
): void => {
  assertNotEquals(result, undefined, message || "Result should be invalid");
  if (result !== undefined) {
    assertEquals(result.rule, payload.rule);
    assertEquals(result.params, payload.params);
    assertEquals(
      result.implicit,
      payload.implicit,
      `Result implicity should be: ${result.implicit ? "true" : "false"}`,
    );
  }
};

export const assertValid = (result: RuleReturn, message?: string): void => {
  assertEquals(result, undefined, message || "Result should be valid");
};
