import { invalid } from "../utils.ts";
import { RuleReturn } from "../types.ts";

export function isNumber(value: any): RuleReturn {
  if (typeof value !== "number") {
    return invalid("isNumber", { value });
  }
}
