import { invalid } from "../utils.ts";
import { RuleReturn } from "../types.ts";

export function notNull(value: any): RuleReturn {
  return (value === null) ? invalid("notNull", { value }, true) : undefined;
}
