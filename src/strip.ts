import type { InputData, ValidationRules } from "./interfaces.ts";
export const strip = (input: InputData, rules: ValidationRules) => {
  const stripped = input;
  for (let key in input) {
    if (!rules[key]) {
      delete stripped[key];
    }
  }
  return stripped;
};
