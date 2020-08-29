import { clearTimes, dateChecks } from "../utils.ts";
import { Validity, Rule } from "../types.ts";

export function dateAfterOrEqual(date: Date): Rule {
  return function dateAfterOrEqualRule(value: any): Validity {
    return dateChecks(
      value,
      "dateAfterOrEqual",
      { date },
      (input: Date): boolean => {
        return clearTimes(input).getTime() >= clearTimes(date).getTime();
      },
    );
  };
}
