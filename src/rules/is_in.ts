import { invalid } from "../utils.ts";
import { Validity, Rule, PrimitiveTypes } from "../types.ts";

export function isIn(allowedValues: PrimitiveTypes[]): Rule {
  return function isInRule(value: any): Validity {
    if (allowedValues.indexOf(value) < 0) {
      return invalid("isIn", { value, allowedValues });
    }
  };
}
