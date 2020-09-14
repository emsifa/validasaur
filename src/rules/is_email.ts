import type { Validity } from "../types.ts";
import { invalid } from "../utils.ts";

export function isEmail(value: any): Validity {
  // https://stackoverflow.com/a/46181
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (typeof value !== "string" || !regex.test(value.toLowerCase())) {
    return invalid("isEmail", { value });
  }
}
