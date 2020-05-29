import { invalid } from "../utils.ts";
import { RuleReturn, Rule, PrimitiveTypes } from "../types.ts";

export function isIn(allowedValues: PrimitiveTypes[]): Rule {
  return function isInRule(value: any): RuleReturn {
    if (allowedValues.indexOf(value) < 0) {
      return invalid("isIn", { value, allowedValues });
    }
  };
}
