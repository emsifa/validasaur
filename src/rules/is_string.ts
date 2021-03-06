import type { Validity } from "../types.ts";
import { invalid } from "../utils.ts";

export function isString(value: any): Validity {
  if (typeof value !== "string") {
    return invalid("isString", { value });
  }
}
