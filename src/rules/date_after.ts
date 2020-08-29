import { clearTimes, dateChecks } from "../utils.ts";
import { Validity, Rule } from "../types.ts";

export function dateAfter(date: Date): Rule {
  return function dateAfterRule(value: any): Validity {
    return dateChecks(value, "dateAfter", { date }, (input: Date): boolean => {
      return clearTimes(input).getTime() > clearTimes(date).getTime();
    });
  };
}
