import { invalid } from "../utils.ts";
import { RuleReturn } from "../types.ts";
import { isNumber } from "./is_number.ts";

export function isFloat(value: any): RuleReturn {
  if (typeof value !== "number" || value % 1 === 0) {
    return invalid("isFloat", { value });
  }
}
