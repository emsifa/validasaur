import { invalid } from "../utils.ts";
import { RuleReturn, Rule } from "../types.ts";
import { isNumber } from "./is_number.ts";

export function minNumber(minValue: number): Rule {
  return function minRule(value: any): RuleReturn {
    return isNumber(value) ||
      (value < minValue
        ? invalid("minNumber", { value, minValue })
        : undefined);
  };
}
