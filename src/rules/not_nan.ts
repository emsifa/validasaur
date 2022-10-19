import type { Validity } from "../types.ts";
import { invalid } from "../utils.ts";

export function notNaN(value: any): Validity {
  return isNaN(value) ? invalid("notNaN", { value }, true) : undefined;
}
