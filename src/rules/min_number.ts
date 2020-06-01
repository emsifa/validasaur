import { invalid } from "../utils.ts";
import { Validity, Rule } from "../types.ts";
import { isNumber } from "./is_number.ts";

export function minNumber(minValue: number): Rule {
  return function minRule(value: any): Validity {
    return isNumber(value) ||
      (value < minValue
        ? invalid("minNumber", { value, minValue })
        : undefined);
  };
}
