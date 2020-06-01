import { invalid } from "../utils.ts";
import { Validity, Rule } from "../types.ts";

export function maxLength(maxValue: number): Rule {
  return function maxLengthRule(value: any): Validity {
    if (typeof value !== "string") {
      return invalid("maxLength", { value, maxValue }, false);
    }

    if (value.length > maxValue) {
      return invalid("maxLength", { value, maxValue }, false);
    }
  };
}
