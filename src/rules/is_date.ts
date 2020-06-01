import { invalid } from "../utils.ts";
import { Validity } from "../types.ts";

export function isDate(value: any): Validity {
  if (typeof value !== "string") {
    return invalid("isDate", { value });
  }

  if (value.length < 10) {
    return invalid("isDate", { value });
  }

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return invalid("isDate", { value });
  }
}
