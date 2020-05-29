import { invalid } from "../utils.ts";
import { RuleReturn } from "../types.ts";

export function isBool(value: any): RuleReturn {
  if (typeof value !== "boolean") {
    return invalid("isBool", { value });
  }
}
