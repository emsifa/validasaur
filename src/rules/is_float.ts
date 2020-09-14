import type { Validity } from "../types.ts";
import { invalid } from "../utils.ts";

export function isFloat(value: any): Validity {
  if (typeof value !== "number" || value % 1 === 0) {
    return invalid("isFloat", { value });
  }
}
