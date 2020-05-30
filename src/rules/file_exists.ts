import { invalid } from "../utils.ts";
import { RuleReturn, Rule, PrimitiveTypes } from "../types.ts";
import { exists } from "https://deno.land/std/fs/exists.ts";

export function fileExists(pathPrefix: string = ""): Rule {
  return async function fileExistsRule(value: any): Promise<RuleReturn> {
    if (typeof value !== "string") {
      return invalid("fileExists", { value, pathPrefix });
    }

    const path = `${pathPrefix}${value}`;
    const isExists = await exists(path);
    if (!isExists) {
      return invalid("fileExists", { value, pathPrefix });
    }
  };
}
