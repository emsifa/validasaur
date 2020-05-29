import { invalid } from "../utils.ts";
import { RuleReturn } from "../types.ts";

export function isString(value: any): RuleReturn {
  if (typeof value !== "string") {
    return invalid("isString", { value });
  }
}
