import { invalid } from "../utils.ts";
import { Validity, Rule } from "../types.ts";

export function startsWith(str: string): Rule {
  return function startsWithRule(value: any): Validity {
    if (typeof value !== "string") {
      return invalid("startsWith", { value, str }, false);
    }

    if (value.startsWith(str) === false) {
      return invalid("startsWith", { value, str }, false);
    }
  };
}
