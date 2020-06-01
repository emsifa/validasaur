import { invalid } from "../utils.ts";
import { Validity } from "../types.ts";

export function nullable(value: any): Validity {
  if (typeof value === "undefined") {
    return invalid("nullable", { value }, true);
  }
}
