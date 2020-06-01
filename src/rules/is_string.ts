import { invalid } from "../utils.ts";
import { Validity } from "../types.ts";

export function isString(value: any): Validity {
  if (typeof value !== "string") {
    return invalid("isString", { value });
  }
}
