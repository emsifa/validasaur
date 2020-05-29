import { invalid } from "../utils.ts";
import { RuleReturn, Rule } from "../types.ts";
import { isNumber } from "./is_number.ts";

export function maxNumber(maxValue: number): Rule {
  return function maxRule(value: any): RuleReturn {
    return isNumber(value) ||
      (value > maxValue
        ? invalid("maxNumber", { value, maxValue })
        : undefined);
  };
}
