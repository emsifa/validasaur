import { clearTimes, dateChecks } from "../utils.ts";
import { Validity, Rule } from "../types.ts";

export function dateBefore(date: Date): Rule {
  return function dateBeforeRule(value: any): Validity {
    return dateChecks(value, "dateBefore", { date }, (input: Date): boolean => {
      return clearTimes(input).getTime() < clearTimes(date).getTime();
    });
  };
}
