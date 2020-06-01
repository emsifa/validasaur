import { invalid } from "../utils.ts";
import { Validity } from "../types.ts";

export function isArray(value: any): Validity {
  if (false === value instanceof Array) {
    return invalid("isArray", { value });
  }
}
