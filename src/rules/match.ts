import { invalid } from "../utils.ts";
import { RuleReturn, Rule } from "../types.ts";

export function match(regex: RegExp, trim: boolean = false): Rule {
  return function matchRule(value: any): RuleReturn {
    if (typeof value !== "string") {
      return invalid("match", { value, regex }, false);
    }

    if (trim) {
      value = value.trim();
    }

    if (!value.match(regex)) {
      return invalid("match", { value, regex }, false);
    }
  };
}
