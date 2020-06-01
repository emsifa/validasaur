import { invalid } from "../utils.ts";
import { Validity } from "../types.ts";

export function notNull(value: any): Validity {
  return (value === null) ? invalid("notNull", { value }, true) : undefined;
}
