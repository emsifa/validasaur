import { invalid } from "../utils.ts";
import { RuleReturn, Rule } from "../types.ts";
import { isNumber } from "./is_number.ts";

export function numberBetween(minValue: number, maxValue: number): Rule {
  return function maxRule(value: any): RuleReturn {
    return isNumber(value) ||
      ((value > maxValue || value < minValue)
        ? invalid("numberBetween", { value, maxValue, minValue })
        : undefined);
  };
}
