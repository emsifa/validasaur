import { invalid, isOptionalValue } from "../utils.ts";
import { RuleReturn } from "../types.ts";

export function required(value: any): RuleReturn {
  return isOptionalValue(value)
    ? invalid("required", { value }, true)
    : undefined;
}
