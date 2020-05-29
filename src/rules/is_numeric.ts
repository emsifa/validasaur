import { invalid } from "../utils.ts";
import { RuleReturn } from "../types.ts";

export function isNumeric(value: any): RuleReturn {
  if (typeof value !== "string" && typeof value !== "number") {
    return invalid("isNumeric", { value });
  }

  if (typeof value === "string" && !(value as string).match(/\d+(\.\d+)?/)) {
    return invalid("isNumeric", { value });
  }
}
