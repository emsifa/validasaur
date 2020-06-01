import { invalid, isOptionalValue } from "../utils.ts";
import { Validity } from "../types.ts";

export function required(value: any): Validity {
  return isOptionalValue(value)
    ? invalid("required", { value }, true)
    : undefined;
}
