import { invalid } from "../utils.ts";
import { RuleReturn } from "../types.ts";
import { isNumber } from "./is_number.ts";

export function isInt(value: any): RuleReturn {
  if (typeof value !== "number" || value % 1 !== 0) {
    return invalid("isInt", { value });
  }
}
