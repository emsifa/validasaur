import { invalid } from "../utils.ts";
import { Validity, Rule } from "../types.ts";

export function minNumber(minValue: number): Rule {
  return function minRule(value: any): Validity {
    if (typeof value !== "number" || value < minValue) {
      return invalid("minNumber", { value, minValue });
    }
  };
}
