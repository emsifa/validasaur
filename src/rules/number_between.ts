import { invalid } from "../utils.ts";
import { Validity, Rule } from "../types.ts";
import { isNumber } from "./is_number.ts";

export function numberBetween(minValue: number, maxValue: number): Rule {
  return function maxRule(value: any): Validity {
    return isNumber(value) ||
      ((value > maxValue || value < minValue)
        ? invalid("numberBetween", { value, maxValue, minValue })
        : undefined);
  };
}
