import { invalid } from "../utils.ts";
import { Validity, Rule } from "../types.ts";

export function lengthBetween(minLength: number, maxLength: number): Rule {
  return function lengthBetweenRule(value: any): Validity {
    if (typeof value !== "string") {
      return invalid("lengthBetween", { value, minLength, maxLength }, false);
    }

    if (value.length < minLength || value.length > maxLength) {
      return invalid("lengthBetween", { value, minLength, maxLength }, false);
    }
  };
}
