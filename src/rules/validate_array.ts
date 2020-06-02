import { invalid, isOptionalValue } from "../utils.ts";
import { Validity, Rule } from "../types.ts";
import { isNumber } from "./is_number.ts";
import { required } from "./required.ts";
import {
  ValidationRules,
  InputData,
  InvalidParams,
  InvalidPayload,
  RawValidationResult,
  ValidationUtils,
} from "../interfaces.ts";
import { validateData, validateValue } from "../validate.ts";

export function validateArray(isRequired: boolean, rules: Rule[]): Rule[] {
  return [
    ...(isRequired ? [required] : []),
    async function ruleArray(
      value: any,
      utils: ValidationUtils,
    ): Promise<Validity> {
      if (isRequired === true && isOptionalValue(value)) {
        return;
      }

      if (false === value instanceof Array) {
        return invalid("validateArray", { value }, true);
      }

      const errors: RawValidationResult = {};
      for (let i in value) {
        const errs = await validateValue(value[i], rules, utils);
        if (errs.length) {
          errors[i.toString()] = [...errs];
        }
      }

      if (Object.keys(errors).length > 0) {
        return invalid("validateArray", { value, errors }, true);
      }
    },
  ];
}
