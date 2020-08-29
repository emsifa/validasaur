import { clearTimes, dateChecks } from "../utils.ts";
import { Validity, Rule } from "../types.ts";

export function dateBeforeOrEqual(date: Date): Rule {
  return function dateBeforeOrEqualRule(value: any): Validity {
    return dateChecks(
      value,
      "dateBeforeOrEqual",
      { date },
      (input: Date): boolean => {
        return clearTimes(input).getTime() <= clearTimes(date).getTime();
      },
    );
  };
}
