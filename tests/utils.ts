import type { Validity } from "../src/types.ts";
import type {
  InvalidPayload,
  ValidationUtils,
  OptionalValidity,
} from "../src/interfaces.ts";
import { assertEquals, assertNotEquals } from "./deps.ts";

export const assertInvalid = (
  result: Validity,
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

export const assertValid = (result: Validity, message?: string): void => {
  assertEquals(
    result === undefined || (result as OptionalValidity).noContext,
    true,
    message || "Result should be valid",
  );
};

export const fakeUtils: ValidationUtils = {
  getValue: (key: string): any => undefined,
  hasValue: (key: string): boolean => false,
};
