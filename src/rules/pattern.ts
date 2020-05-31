import { invalid } from "../utils.ts";
import { RuleReturn, Rule } from "../types.ts";

export function pattern(regex: RegExp, trim: boolean = false): Rule {
  return function patternRule(value: any): RuleReturn {
    if (typeof value !== "string") {
      return invalid("pattern", { value, regex }, false);
    }

    if (trim) {
      value = value.trim();
    }

    if (!value.match(regex)) {
      return invalid("pattern", { value, regex }, false);
    }
  };
}
