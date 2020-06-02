import { ValidationResult, Rule, Validity } from "./types.ts";
import {
  ValidationRules,
  ValidationOptions,
  RawValidationResult,
  InputData,
  InvalidPayload,
  ValidationUtils,
} from "./interfaces.ts";
import {
  isOptional,
  isOptionalValue,
  resolveErrorMessages,
  isNullable,
  makeValidationUtils,
} from "./utils.ts";
import { defaultMessages } from "./messages.ts";

const getValue = (input: InputData, key: string): any => {
  return input[key];
};

export const validateValue = async (
  value: any,
  rules: Rule[],
  utils: ValidationUtils,
): Promise<InvalidPayload[]> => {
  if (isOptionalValue(value) && isOptional(rules)) {
    return [];
  }

  if (typeof value === "object" && value === null && isNullable(rules)) {
    return [];
  }

  const results = [];
  for (let rule of rules) {
    let res = rule(value, utils);
    if (res instanceof Promise) {
      res = await res;
    }

    if (res !== undefined) {
      results.push(res);
      if (res.implicit === true) {
        break;
      }
    }
  }
  return results;
};

export const validateData = async (
  input: InputData,
  rules: ValidationRules,
): Promise<RawValidationResult> => {
  const results: RawValidationResult = {};
  const utils: ValidationUtils = makeValidationUtils(input);
  for (let key in rules) {
    const keyRules = (rules[key] instanceof Array
      ? rules[key]
      : [rules[key]]) as Rule[];
    const value: any = getValue(input, key);
    const errors: InvalidPayload[] = await validateValue(
      value,
      keyRules,
      utils,
    );
    if (errors.length) {
      results[key] = errors;
    }
  }
  return results;
};

export const validate = async (
  input: InputData,
  rules: ValidationRules,
  options: ValidationOptions = {
    messages: defaultMessages,
  },
): Promise<ValidationResult> => {
  const rawErrors = await validateData(input, rules);
  const passes = Object.keys(rawErrors).length === 0;

  const errors = passes ? {} : resolveErrorMessages(rawErrors, options);

  return [passes, errors];
};
