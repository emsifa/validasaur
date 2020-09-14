import type { Validity, Rule } from "../types.ts";
import { invalid } from "../utils.ts";

export function minLength(minValue: number): Rule {
  return function minLengthRule(value: any): Validity {
    if (typeof value !== "string") {
      return invalid("minLength", { value, minValue }, false);
    }

    if (value.length < minValue) {
      return invalid("minLength", { value, minValue }, false);
    }
  };
}
