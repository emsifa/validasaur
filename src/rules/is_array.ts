import { invalid } from "../utils.ts";
import { RuleReturn } from "../types.ts";

export function isArray(value: any): RuleReturn {
  if (false === value instanceof Array) {
    return invalid("isArray", { value });
  }
}
