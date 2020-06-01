import { invalid } from "../utils.ts";
import { Validity } from "../types.ts";

export function isBool(value: any): Validity {
  if (typeof value !== "boolean") {
    return invalid("isBool", { value });
  }
}
