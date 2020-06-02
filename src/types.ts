import {
  ValidationErrors,
  InvalidPayload,
  ValidationUtils,
} from "./interfaces.ts";

export type OptionalValue = null | undefined | "";

export type Validity = InvalidPayload | undefined;

export type Rule = (
  value: any,
  utils: ValidationUtils,
) => Validity | Promise<Validity>;

export type ValidationResult = [boolean, ValidationErrors];

export type PrimitiveTypes =
  | null
  | boolean
  | string
  | number
  | undefined
  | Symbol;
