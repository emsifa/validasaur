import type { Validity, Rule } from "../types.ts";
import { required } from "./required.ts";
import { optionallyValid } from "../utils.ts";

export function requiredIf(field: string, fieldValue: any): Rule {
  return function requiredIfRule(value: any, { getValue }): Validity {
    const val = getValue(field);
    if (val === fieldValue) {
      return required(value);
    }
    return optionallyValid(true);
  };
}
