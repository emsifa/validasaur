import { ValidationErrors, InvalidPayload } from "./interfaces.ts";

export type OptionalValue = null | undefined | '';

export type RuleReturn = InvalidPayload | undefined;

export type Rule = (value: any) => RuleReturn | Promise<RuleReturn>;

export type ValidationResult = [boolean, ValidationErrors];

export type PrimitiveTypes =
  | null
  | boolean
  | string
  | number
  | undefined
  | Symbol;
