import { invalid } from "../utils.ts";
import { RuleReturn, Rule, PrimitiveTypes } from "../types.ts";

export function notIn(disallowedValues: PrimitiveTypes[]): Rule {
  return function notInRule(value: any): RuleReturn {
    return disallowedValues.indexOf(value) > -1
      ? invalid("notIn", { value, disallowedValues })
      : undefined;
  };
}
