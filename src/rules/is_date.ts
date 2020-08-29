import { dateChecks } from "../utils.ts";
import { Validity } from "../types.ts";

export function isDate(value: any): Validity {
  return dateChecks(value, "isDate");
}
