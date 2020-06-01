import { invalid } from "../utils.ts";
import { Validity } from "../types.ts";

export function isNumber(value: any): Validity {
  if (typeof value !== "number") {
    return invalid("isNumber", { value });
  }
}
