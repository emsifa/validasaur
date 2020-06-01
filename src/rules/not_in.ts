import { invalid } from "../utils.ts";
import { Validity, Rule, PrimitiveTypes } from "../types.ts";

export function notIn(disallowedValues: PrimitiveTypes[]): Rule {
  return function notInRule(value: any): Validity {
    return disallowedValues.indexOf(value) > -1
      ? invalid("notIn", { value, disallowedValues })
      : undefined;
  };
}
