import { invalid } from "../utils.ts";
import { Validity, Rule } from "../types.ts";

export function numberBetween(minValue: number, maxValue: number): Rule {
  return function maxRule(value: any): Validity {
    if (typeof value !== "number" || (value < minValue || value > maxValue)) {
      return invalid("numberBetween", { value, maxValue, minValue });
    }
  };
}
