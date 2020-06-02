import { Rule } from "./types.ts";
import {
  InvalidParams,
  InvalidPayload,
  ValidationErrors,
  FirstMessages,
  FlattenMessages,
  RawValidationResult,
  ValidationOptions,
  ValidationMessages,
  InputData,
  ValidationUtils,
} from "./interfaces.ts";
import { required } from "./rules/required.ts";
import { nullable } from "./rules/nullable.ts";

export function invalid(
  rule: string,
  params: InvalidParams = {},
  implicit = false,
): InvalidPayload {
  return { rule, params, implicit };
}

export function isNullable(rules: Rule[]): boolean {
  return rules.find((rule: Rule) => rule === nullable) ? true : false;
}

export function isOptional(rules: Rule[]): boolean {
  return rules.find((rule: Rule) => rule === required) ? false : true;
}

export function isOptionalValue(value: any): boolean {
  return value === undefined || value === null || value === "";
}

export function firstMessages(messages: ValidationErrors): FirstMessages {
  const results: FirstMessages = {};

  for (let key in messages) {
    const ruleNames = Object.keys(messages[key]);
    const firstRule = ruleNames[0];
    const firstMessage = messages[key][firstRule];

    if (firstRule === "validateObject" || firstRule === "validateArray") {
      results[key] = firstMessages(firstMessage as ValidationErrors);
    } else {
      results[key] = firstMessage;
    }
  }

  return results;
}

export function flattenMessages(
  messages: ValidationErrors,
  firstMessagesOnly: boolean = false,
): FlattenMessages {
  const flatten = (data: any, prefix: string = ""): FlattenMessages => {
    if (typeof data !== "object") {
      return {};
    }

    let results: FlattenMessages = {};
    for (let key in data) {
      const d = data[key];
      const resKey = `${prefix ? prefix + "." : ""}${key}`.replace(
        /\.validate(Array|Object)/g,
        "",
      );
      if (typeof d === "object" && d !== null) {
        results = { ...results, ...flatten(d, resKey) };
      } else {
        results[resKey] = d;
      }
    }
    return results;
  };

  const results: FlattenMessages = {
    ...(firstMessagesOnly ? {} : flatten(messages)),
    ...flatten(firstMessages(messages)),
  };

  return results;
}

export const resolveErrorMessage = (
  msg: string,
  params: InvalidParams,
  attr: string,
): string => {
  params.attr = attr;

  for (let key in params) {
    msg = msg.replace(`:${key}`, params[key] as string);
  }

  return msg;
};

export const findBestMessage = (
  messages: ValidationMessages,
  key: string,
  ruleName: string,
  ruleKey: string,
  defaultMessage: string,
): string => {
  return messages[`${key}.${ruleName}`] || messages[`${key}.${ruleKey}`] ||
    messages[key] ||
    messages[ruleName] || messages[ruleKey] || defaultMessage;
};

export const resolveErrorMessages = (
  rawErrors: RawValidationResult,
  { messages, attributes }: ValidationOptions,
): ValidationErrors => {
  const errorMessages: ValidationErrors = {};
  const defaultMessage = (messages || {})["default"] || ":attr is invalid";
  for (let key in rawErrors) {
    const errs = rawErrors[key] as InvalidPayload[];
    const attr = (attributes || {})[key] || key;
    errorMessages[key] = {} as { [k: string]: string };
    for (let err of errs) {
      const ruleKey = err.rule.replace(/\:\w+$/, "");
      if (err.rule === "validateObject" && err.params.errors) {
        errorMessages[key][ruleKey] = resolveErrorMessages(
          err.params.errors,
          { messages, attributes },
        );
      } else if (err.rule === "validateArray" && err.params.errors) {
        errorMessages[key][ruleKey] = resolveErrorMessages(
          err.params.errors,
          { messages, attributes },
        );
      } else {
        const msg = findBestMessage(
          messages || {},
          key,
          err.rule,
          ruleKey,
          defaultMessage,
        );
        errorMessages[key][ruleKey] = resolveErrorMessage(
          msg,
          err.params,
          attr,
        );
      }
    }
  }
  return errorMessages;
};

export const isStringInt = (value: string): boolean => {
  return value.match(/^\d+$/) ? true : false;
};

export const getValue = (input: InputData, key: string): any => {
  if (typeof input[key] !== "undefined") {
    return input[key];
  }

  const paths = key.split(".");
  const value = paths.reduce((data: any, path: string): any => {
    if (data && typeof data === "object") {
      return data[path];
    } else if (data instanceof Array && isStringInt(path)) {
      const index = parseInt(path);
      return data[index];
    }
  }, { ...input });

  return value;
};

export const hasValue = (input: InputData, key: string): boolean => {
  const value = getValue(input, key);
  return typeof value !== "undefined";
};

export const makeValidationUtils = (input: InputData): ValidationUtils => {
  return {
    getValue: (key: string): any => getValue(input, key),
    hasValue: (key: string): boolean => hasValue(input, key),
  };
};
