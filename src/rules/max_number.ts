import { invalid } from "../utils.ts";
import { Validity, Rule } from "../types.ts";

export function maxNumber(maxValue: number): Rule {
  return function maxRule(value: any): Validity {
    if (typeof value !== "number" || value > maxValue) {
      return invalid("maxNumber", { value, maxValue });
    }
  };
}
