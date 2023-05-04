import type { Validity } from "../types.ts";
import { invalid } from "../utils.ts";

export function isAlphaNumeric(value: any): Validity {

  if (typeof value === "string" && !(value as string).match(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/)) {
    return invalid("isAlphaNumeric", { value });
  }
}
