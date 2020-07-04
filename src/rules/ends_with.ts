import { invalid } from "../utils.ts";
import { Validity, Rule } from "../types.ts";

export function endsWith(str: string): Rule {
  return function endsWithRule(value: any): Validity {
    if (typeof value !== "string") {
      return invalid("endsWith", { value, str }, false);
    }

    if (value.endsWith(str) === false) {
      return invalid("endsWith", { value, str }, false);
    }
  };
}
