import type { Validity } from "../types.ts";
import { invalid } from "../utils.ts";

export function isBool(value: any): Validity {
  if (typeof value !== "boolean") {
    return invalid("isBool", { value });
  }
}
