import { clearTimes, dateChecks } from "../utils.ts";
import { Validity, Rule } from "../types.ts";

export function dateBetween(minDate: Date, maxDate: Date): Rule {
  return function dateBetweenRule(value: any): Validity {
    return dateChecks(
      value,
      "dateBetween",
      { minDate, maxDate },
      (input: Date): boolean => {
        const inputDateTime = clearTimes(input).getTime();
        const minDateTime = clearTimes(minDate).getTime();
        const maxDateTime = clearTimes(maxDate).getTime();

        return inputDateTime >= minDateTime && inputDateTime <= maxDateTime;
      },
    );
  };
}
