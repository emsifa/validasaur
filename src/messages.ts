import { ValidationMessages } from "./interfaces.ts";

export const defaultMessages: ValidationMessages = {
  "required": ":attr is required",
  "isInt": ":attr must be an integer",
  "isFloat": ":attr must be a float number",
  "isString": ":attr must be a string",
  "isNumber": ":attr must be a number",
  "isArray": ":attr must be an array",
  "isIn": ":attr ':value' is not allowed",
};
