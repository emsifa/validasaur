import { invalid } from "../utils.ts";
import { Validity } from "../types.ts";

export function isUrl(value: any): Validity {
  // From
  const expression =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;

  const regex = new RegExp(expression);

  if (typeof value !== "string" || !regex.test(value.toLowerCase())) {
    return invalid("isUrl", { value });
  }
}
